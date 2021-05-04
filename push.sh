#!/bin/sh
export GITHUB_USER
export GITHUB_PASS

CURRENTDATE=`date +"%Y.%m.%d-%H.%M"`
echo Current Date and Time is: ${CURRENTDATE}

# Start from scratch
rm -rf qqw-generated-assets
mkdir qqw-generated-assets
git clone 'https://$GITHUB_USER:$GITHUB_PASS@github.com/ProjectPODER/qqw-generated-assets.git'

# Replace sitemap files with newly generated ones
cd qqw-generated-assets
rm -f *.xml
cp ../*.xml .

# Commit and push
git add .
git commit -am "${CURRENTDATE}"
git push https://$GITHUB_USER:$GITHUB_PASS@github.com/ProjectPODER/qqw-generated-assets.git --all
