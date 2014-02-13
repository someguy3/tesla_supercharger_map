#!/bin/bash

PROJECT_VERSION='2.0'
BUILD_TIMESTAMP=`date +'%b %d, %I:%M %p %Z'`
DIR_PROJECT='project'
DIR_BUILT='project-built'
FILE_CHANGE_LOG=${DIR_BUILT}/changelog.txt

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
TEMP_FILE=/tmp/newlog.txt

git log --grep='@changeLog' --pretty=format:'%cd || %s' --date=local --since 'Sun Feb 9 21:40:00 2014 -0600' | sed 's/ [0-9]*:[0-9]*:[0-9]*//' > ${TEMP_FILE}
printf "\n" >> ${TEMP_FILE}
cat ${TEMP_FILE} ${FILE_CHANGE_LOG} > ${FILE_CHANGE_LOG}.tmp
mv ${FILE_CHANGE_LOG}.tmp ${FILE_CHANGE_LOG}