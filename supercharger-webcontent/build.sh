#!/bin/bash

DIR_PROJECT='project'
DIR_BUILT='project-built'

# CSS
nodejs r.js -o cssIn=${DIR_PROJECT}/css/main.css out=${DIR_BUILT}/css/main.css

# JS
nodejs r.js -o build.js


cp -R ${DIR_PROJECT}/fonts ${DIR_BUILT}
cp -R ${DIR_PROJECT}/images ${DIR_BUILT}
cp -R ${DIR_PROJECT}/index.html ${DIR_BUILT}
cp ${DIR_PROJECT}/scripts/require.js ${DIR_BUILT}/scripts