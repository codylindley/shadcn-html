#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/deploy.sh [patch|minor|major]
# Default: patch

BUMP_TYPE="${1:-patch}"

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

# Read current version from package.json
OLD_VERSION=$(node -p "require('./package.json').version")

# Compute new version
IFS='.' read -r MAJOR MINOR PATCH <<< "$OLD_VERSION"
case "$BUMP_TYPE" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "❌ Invalid bump type: $BUMP_TYPE (use patch, minor, or major)"; exit 1 ;;
esac
NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"

echo "📦 Bumping version: v${OLD_VERSION} → v${NEW_VERSION} (${BUMP_TYPE})"

# Update package.json
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.version = '${NEW_VERSION}';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update version in site header (layout.js)
sed -i '' "s/v${OLD_VERSION}/v${NEW_VERSION}/g" dist/documentation/js/layout.js

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

# Build the HTML entry
ENTRY="  <div style=\"margin-bottom:2.5rem;\">\n"
ENTRY+="    <div class=\"flex items-center gap-3 mb-2\">\n"
ENTRY+="      <h2 style=\"font-family:var(--font-display);font-size:1.375rem;font-weight:400;letter-spacing:-0.02em;margin:0;\">v${NEW_VERSION}</h2>\n"
ENTRY+="      <span class=\"badge\" data-variant=\"outline\" style=\"font-family:var(--font-mono);\">${DATE}</span>\n"
ENTRY+="    </div>\n"
ENTRY+="    <ul style=\"margin:0;padding-left:1.25rem;\" class=\"text-sm text-muted-foreground flex flex-col gap-1\">\n"

if [[ -n "$COMMITS" ]]; then
  while IFS= read -r msg; do
    # Escape HTML characters
    safe_msg=$(echo "$msg" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    ENTRY+="      <li>${safe_msg}</li>\n"
  done <<< "$COMMITS"
else
  ENTRY+="      <li>Maintenance release</li>\n"
fi

ENTRY+="    </ul>\n"
ENTRY+="  </div>\n"

# Insert the entry after the marker comment
sed -i '' "s|<!-- CHANGELOG_ENTRIES -->|<!-- CHANGELOG_ENTRIES -->\\
$(echo -e "$ENTRY" | sed 's/$/\\/' | sed '$ s/\\$//')|" "$CHANGELOG_FILE"

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

# Switch back to dev
git checkout dev

echo ""
echo "🚀 Deployed v${NEW_VERSION} to production!"
echo "   • main branch pushed → Netlify will auto-deploy"
echo "   • Tagged: v${NEW_VERSION}"
echo "   • Back on dev branch"
