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

# Commit the version bump on dev and push
git add package.json dist/documentation/js/layout.js
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
