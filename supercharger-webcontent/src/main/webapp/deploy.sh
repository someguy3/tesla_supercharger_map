#!/bin/bash

DIR_SRC=/tmp/supercharger-webcontent-1.?.?-SNAPSHOT
DIR_DEPLOY=/var/www/tesla_wiki/supercharger

# The string check here is for extra safely.
if [ "${DIR_DEPLOY}" != "" ]
then
    rm -r ${DIR_DEPLOY}/*
fi

mv ${DIR_SRC}/* ${DIR_DEPLOY}

chown -R www-data:www-data ${DIR_DEPLOY}
chmod -R go-w ${DIR_DEPLOY}

rm -r ${DIR_SRC}