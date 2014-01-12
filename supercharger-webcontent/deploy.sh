#!/bin/bash
#==============================================================================================
# Deploy
#==============================================================================================

WEB_APP='supercharger-webcontent-1.?.?-SNAPSHOT'
REMOTE_HOST=dev.redshiftsoft.com
SSH_USER=keith
DIR_DEPLOY=/var/www/wiki_tesla/supercharger2

# The string check here is for extra safely.
if [ "${DIR_DEPLOY}" != "" ]
then
    ssh ${SSH_USER}@${REMOTE_HOST} rm -r ${DIR_DEPLOY}
    ssh ${SSH_USER}@${REMOTE_HOST} mkdir ${DIR_DEPLOY}
fi

scp -r supercharger-webcontent/target/${WEB_APP}/* ${SSH_USER}@${REMOTE_HOST}:${DIR_DEPLOY}/

ssh ${SSH_USER}@${REMOTE_HOST} chown -R keith:www-data ${DIR_DEPLOY}
