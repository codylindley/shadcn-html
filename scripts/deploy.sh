#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/deploy.sh [patch|minor|major] [alpha|beta|rc|release]
# Default: patch, preserving current prerelease suffix
#
# Examples:
#   ./scripts/deploy.sh              → 0.3.0-alpha  → 0.3.1-alpha  (patch bump, keep suffix)
#   ./scripts/deploy.sh minor        → 0.3.1-alpha  → 0.4.0-alpha  (minor bump, keep suffix)
#   ./scripts/deploy.sh patch beta   → 0.4.0-alpha  → 0.4.1-beta   (patch bump, change to beta)
#   ./scripts/deploy.sh patch release→ 0.4.1-beta   → 0.4.2        (patch bump, drop suffix)
#
# This is a RELEASE deploy. It:
#   1. Bumps the version in package.json and layout.js
#   2. Generates a changelog entry from git commits
#   3. Commits and pushes to dev
#   4. Merges dev → main and pushes
#   5. Creates a git tag
#
# For non-release changes (README, doc fixes, etc.), use:
#   npm run push

BUMP_TYPE="${1:-patch}"
PHASE="${2:-}"  # alpha, beta, rc, release, or empty (keep current)

# Ensure we're on dev
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "dev" ]]; then
  echo "❌ You must be on the dev branch to deploy. Currently on: $CURRENT_BRANCH"
  exit 1
fi

# Ensure working tree is clean
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Working tree is dirty. Commit or stash changes first."
  exit 1
fi

# Read current version from package.json (may include prerelease suffix like -alpha)
FULL_VERSION=$(node -p "require('./package.json').version")

# Split into base version and prerelease suffix
BASE_VERSION=$(echo "$FULL_VERSION" | sed 's/-.*//')
CURRENT_SUFFIX=$(echo "$FULL_VERSION" | grep -o '\-.*' || true)

# Compute new base version
IFS='.' read -r MAJOR MINOR PATCH <<< "$BASE_VERSION"
case "$BUMP_TYPE" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "❌ Invalid bump type: $BUMP_TYPE (use patch, minor, or major)"; exit 1 ;;
esac
NEW_BASE="${MAJOR}.${MINOR}.${PATCH}"

# Determine prerelease suffix for new version
if [[ "$PHASE" == "release" ]]; then
  NEW_SUFFIX=""
elif [[ -n "$PHASE" ]]; then
  NEW_SUFFIX="-${PHASE}"
else
  NEW_SUFFIX="$CURRENT_SUFFIX"  # keep current suffix
fi

NEW_VERSION="${NEW_BASE}${NEW_SUFFIX}"

echo "📦 Bumping version: v${FULL_VERSION} → v${NEW_VERSION} (${BUMP_TYPE}${PHASE:+, phase: $PHASE})"

# Update package.json
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.version = '${NEW_VERSION}';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update version in site header (layout.js) — replaces full version including suffix
sed -i '' "s/v${FULL_VERSION}/v${NEW_VERSION}/g" dist/documentation/js/layout.js

echo "✅ Updated version in package.json and layout.js"

# Generate changelog entry from git commits since last tag
CHANGELOG_FILE="dist/documentation/changelog.html"
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
DATE=$(date +"%B %d, %Y")

# Collect commit messages (skip merge commits and version bumps)
if [[ -n "$LAST_TAG" ]]; then
  COMMITS=$(git log "${LAST_TAG}..HEAD" --pretty=format:"%s" --no-merges | grep -v "^chore: bump version" || true)
else
  COMMITS=$(git log --pretty=format:"%s" --no-merges | grep -v "^chore: bump version" || true)
fi

# Build and inject the changelog entry using Node (avoids sed multi-line issues)
node -e "
  const fs = require('fs');
  const version = '${NEW_VERSION}';
  const date = '${DATE}';
  const commits = [...new Set(\`${COMMITS}\`.split('\n').filter(Boolean))];

  const items = commits.length
    ? commits.map(m => {
        const safe = m.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        return '      <li>' + safe + '</li>';
      }).join('\n')
    : '      <li>Maintenance release</li>';

  const entry = [
    '  <div style=\"margin-bottom:2.5rem;\">',
    '    <div class=\"flex items-center gap-3 mb-2\">',
    '      <h2 style=\"font-family:var(--font-display);font-size:1.375rem;font-weight:400;letter-spacing:-0.02em;margin:0;\">v' + version + '</h2>',
    '      <span class=\"badge\" data-variant=\"outline\" style=\"font-family:var(--font-mono);\">' + date + '</span>',
    '    </div>',
    '    <ul style=\"margin:0;padding-left:1.25rem;\" class=\"text-sm text-muted-foreground flex flex-col gap-1\">',
    items,
    '    </ul>',
    '  </div>',
  ].join('\n');

  const file = fs.readFileSync('${CHANGELOG_FILE}', 'utf8');
  fs.writeFileSync('${CHANGELOG_FILE}', file.replace('<!-- CHANGELOG_ENTRIES -->', '<!-- CHANGELOG_ENTRIES -->\n\n' + entry));
"

echo "✅ Added changelog entry for v${NEW_VERSION}"

# Commit the version bump on dev and push
git add package.json dist/documentation/js/layout.js dist/documentation/changelog.html
git commit -m "chore: bump version to v${NEW_VERSION}"
git push origin dev

# Merge into main and push
git checkout main
git merge dev -m "release: v${NEW_VERSION}"
git push origin main

# Tag the release
git tag "v${NEW_VERSION}"
git push origin "v${NEW_VERSION}"

# Create GitHub Release from commit log
RELEASE_NOTES=$(echo "$COMMITS" | sed 's/^/- /')
if [[ -z "$RELEASE_NOTES" ]]; then
  RELEASE_NOTES="- Maintenance release"
fi

if command -v gh &> /dev/null; then
  gh release create "v${NEW_VERSION}" \
    --title "v${NEW_VERSION}" \
    --notes "$RELEASE_NOTES" \
    --target main
  echo "✅ Created GitHub Release for v${NEW_VERSION}"
else
  echo "⚠️  gh CLI not found — skipping GitHub Release (install: https://cli.github.com)"
fi

# Switch back to dev
git checkout dev

echo ""
echo "🚀 Deployed v${NEW_VERSION} to production!"
echo "   • main branch pushed → Netlify will auto-deploy"
echo "   • Tagged: v${NEW_VERSION}"
echo "   • GitHub Release created"
echo "   • Back on dev branch"
