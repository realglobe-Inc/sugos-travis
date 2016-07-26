#!/bin/sh -e

echo "registry = https://realglobe.artifactoryonline.com/realglobe/api/npm/npm-virtual" >> $HOME/.npmrc
curl -u${NPM_USER}:${NPM_PASSWORD} "https://realglobe.artifactoryonline.com/realglobe/api/npm/auth" >> $HOME/.npmrc
cat $HOME/.npmrc
