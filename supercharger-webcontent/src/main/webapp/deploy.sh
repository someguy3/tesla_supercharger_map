#!/bin/bash

DIR_SRC=/tmp/supercharger-webcontent-1.0.?-SNAPSHOT
DIR_DEPLOY_=/var/www/tesla_wiki/supercharger

rm -rf ${DIR_DEPLOY}/*
mv ${DIR_SRC}/* ${DIR_DEPLOY}
chown -R www-data:www-data ${DIR_DEPLOY}
chmod -R go-w ${DIR_DEPLOY}


rm -r ${DIR_SRC}