#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/push.sh [commit message]
# Pushes to dev without bumping version. Netlify auto-deploys the dev branch.
# Use this for README updates, doc fixes, and other non-release changes.

MSG="${1:-chore: update docs}"

# Ensure we're on dev
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "dev" ]]; then
  echo "❌ You must be on the dev branch. Currently on: $CURRENT_BRANCH"
  exit 1
fi

# Stage and commit
git add -A

if git diff --cached --quiet; then
  echo "⚠️  Nothing to commit."
  exit 0
fi

git commit -m "$MSG"
git push origin dev

# Merge to main so changes go live on production
git checkout main
git merge dev -m "$MSG"
git push origin main
git checkout dev

echo "✅ Pushed to dev and main (no version bump). Netlify will auto-deploy."
