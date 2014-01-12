#!/bin/bash

PROJECT_VERSION=2.0.0
BUILD_TIMESTAMP=`date +'%b %d %I:%M %Z'`
DIR_PROJECT='project'
DIR_BUILT='project-built'

echo "------------------------------------------------"
echo "PROJECT_VERSION: ${PROJECT_VERSION}"
echo "BUILD_TIMESTAMP: ${BUILD_TIMESTAMP}"
echo "DIR_PROJECT    : ${DIR_PROJECT}"
echo "DIR_BUILT      : ${DIR_BUILT}"
echo "------------------------------------------------"


# CSS
nodejs r.js -o cssIn=${DIR_PROJECT}/css/main.css out=${DIR_BUILT}/css/main.css

# JS
nodejs r.js -o build.js


cp -R ${DIR_PROJECT}/fonts ${DIR_BUILT}
cp -R ${DIR_PROJECT}/images ${DIR_BUILT}

cp ${DIR_PROJECT}/* ${DIR_BUILT}
cp ${DIR_PROJECT}/scripts/require.js ${DIR_BUILT}/scripts

#
# Version
#
sed -i "s/\${build.timestamp}/${BUILD_TIMESTAMP}/g" ${DIR_BUILT}/version.json
sed -i "s/\${project.version}/${PROJECT_VERSION}/g" ${DIR_BUILT}/version.json


#
# change log
#
# TODO: append --> git log --grep=live --grep='ADD SUPER' --pretty=format:'%cd||%s' | sed 's/ +0000//'