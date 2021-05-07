#!/bin/sh
export GITHUB_USER
export GITHUB_PASS

G_USER="$(echo "${GITHUB_USER}" | tr -d '[[:space:]]')"
G_PASS="$(echo "${GITHUB_PASS}" | tr -d '[[:space:]]')"
REPO="https://${G_USER}:${G_PASS}@github.com/ProjectPODER/qqw-generated-assets.git"
echo $REPO
CURRENTDATE=`date +"%Y.%m.%d-%H.%M"`
echo Current Date and Time is: ${CURRENTDATE}

# Start from scratch
rm -rf $POPPINS_SCRIPTS_DIR/qqw-sitemap/qqw-generated-assets
mkdir $POPPINS_SCRIPTS_DIR/qqw-sitemap/qqw-generated-assets
git clone $REPO
echo Cloned generated assets

# Replace sitemap files with newly generated ones
rm -f $POPPINS_SCRIPTS_DIR/qqw-sitemap/qqw-generated-assets/*.xml
mv $POPPINS_SCRIPTS_DIR/qqw-sitemap/*.xml $POPPINS_SCRIPTS_DIR/qqw-sitemap/qqw-generated-assets/
echo Copied files to repo

# Commit and push
cd $POPPINS_SCRIPTS_DIR/qqw-sitemap/qqw-generated-assets
git add .
git commit -am "${CURRENTDATE}"
git push $REPO --all
echo Pushed repo
