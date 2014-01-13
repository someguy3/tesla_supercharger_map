#!/bin/bash
#==============================================================================================
# Deploy
#==============================================================================================

WEB_APP_DIR='project'
REMOTE_HOST=dev.redshiftsoft.com
SSH_USER=keith
DIR_DEPLOY=/var/www/wiki_tesla/supercharger

# The string check here is for extra safely.
if [ "${DIR_DEPLOY}" != "" ]
then
    ssh ${SSH_USER}@${REMOTE_HOST} rm -r ${DIR_DEPLOY}
    ssh ${SSH_USER}@${REMOTE_HOST} mkdir ${DIR_DEPLOY}
fi

scp -r ${WEB_APP_DIR}/* ${SSH_USER}@${REMOTE_HOST}:${DIR_DEPLOY}/

ssh ${SSH_USER}@${REMOTE_HOST} chown -R keith:www-data ${DIR_DEPLOY}
