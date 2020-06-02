#!/bin/bash
# 热升级资源文件压缩

function initVar()
{
	date="`date '+%Y%m%d%H'`"
	destDir="/Volumes/other/hotUpgradeFiles"
	androidDir="android/app/src/main/assets"
	iosDir="ios/App"
	wwwDir="public"

	rm -rf ${destDir}/*
	mkdir -p ${destDir}
}

function zipAndroid()
{
	cd ${androidDir}
	zipPath=${destDir}/android-${date}.zip
	zip -q -r ${zipPath} ${wwwDir}
	md5 ${zipPath}
	cd - > /dev/null
}
function zipIos()
{
	cd ${iosDir}
	zipPath=${destDir}/ios-${date}.zip
	zip -q -r ${zipPath} ${wwwDir}
	md5 ${zipPath}
	cd - > /dev/null
}

initVar
zipAndroid
zipIos


