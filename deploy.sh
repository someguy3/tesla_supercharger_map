#!/bin/bash

WEB_APP='supercharger-webcontent-1.0.?-SNAPSHOT'

scp -r supercharger-webcontent/target/${WEB_APP} keith@dev:/tmp/

ssh keith@dev chmod u+x /tmp/${WEB_APP}/deploy.sh