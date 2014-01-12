#!/bin/bash


cd supercharger-webcontent

nodejs r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js
