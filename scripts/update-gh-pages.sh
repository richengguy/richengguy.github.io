#!/bin/bash
set -eu

cd ${DEPLOYMENT_FOLDER}

# Need to use the GitHub authentication token to cause a gh-pages build.  More
# details here;
# https://www.innoq.com/en/blog/github-actions-automation/
repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

# First, setup a new repo in the deployment folder.
git init

git config user.name "richengguy"
git config user.email "richengguy@users.noreply.github.com"

# Add the main repo (see above) as a remote and do a shallow fetch.
git remote add repo "$repo_uri"
git fetch --depth=1 repo

# Create an orphaned branch for the deployment branch.
git checkout --orphan ${DEPLOYMENT_BRANCH}

# Add all of the files (basically a clean slate) and perform a force push to
# update the remote branch and overwrite it.
git add .
git commit -m "Updated on $(date)."
git push --force repo ${DEPLOYMENT_BRANCH}
