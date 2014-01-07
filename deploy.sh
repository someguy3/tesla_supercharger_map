#!/bin/bash

WEB_APP='supercharger-webcontent-1.?.?-SNAPSHOT'
REMOTE_HOST=dev.redshiftsoft.com
SSH_USER=keith

scp -r supercharger-webcontent/target/${WEB_APP} ${SSH_USER}@${REMOTE_HOST}:/tmp/

ssh ${SSH_USER}@${REMOTE_HOST} chmod u+x /tmp/${WEB_APP}/deploy.sh
ssh ${SSH_USER}@${REMOTE_HOST} /tmp/${WEB_APP}/deploy.sh