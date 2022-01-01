#!/bin/bash
set -eu

cd ${DEPLOYMENT_FOLDER}

# Need to use the GitHub authentication token to cause a gh-pages build.  More
# details here;
# https://www.innoq.com/en/blog/github-actions-automation/
repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git init

git config user.name "richengguy"
git config user.email "richengguy@users.noreply.github.com"

git remote add repo "$repo_uri"
git fetch --depth=1 repo
git checkout --orphan ${DEPLOYMENT_BRANCH}

git add .
git commit -m "Updated on $(date)."
git push --force repo ${DEPLOYMENT_BRANCH}
