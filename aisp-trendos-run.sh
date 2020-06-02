#!/bin/bash
# @Time    : 2019年7月11日
# @Desc    : AISP-SCVMWEB deploy/rollback
# @File    : aisp-scvmweb-run.sh
# @Software: PyCharm
# @Author  : zczeng

function init_var()
{
	datepath="`date '+%Y%m%d'`"
	parentdir="/data/projects/scvmadm"
	workdir="/data/projects/scvmadm/html/app"
	backupdir="/data/projects/scvmadm/app-backup"
	releasedir="/data/temp/aisp-trendos-app-release/www/*"
}

function print_log()
{
	local _msg="$1"
	local _level="$2"
	echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$_level] ${_msg}"
}

function deploy()
{
	# step1 : backup web directory
	print_log "backup fedweb"  "INFO"
	mkdir -p ${backupdir}/$datepath/
	cp -rf ${workdir} ${backupdir}/$datepath/
	if [ $? -ne 0 ];then 
		print_log "backup fedweb  failed"
		exit 2
	fi
	print_log "backup fedweb successfully"  "INFO"
	sleep 1

	# step2 : deploy web service
	print_log "start deploy fedweb"  "INFO"
	cp -rf ${releasedir} ${workdir}
	rm -rf ${releasedir}
	if [ $? -ne 0 ];then 
		print_log "deploy fedweb  failed"
		exit 2
	fi
	print_log "deploy fedweb successfully"  "INFO"
	sleep 1

	# step3 : start web service
	print_log "finish deploy , all successfully" "INFO"
	exit 0 
}

function rollback()
{
	# step1 : backup web directory
	print_log "rollback fedweb"  "INFO"
	rm -r ${workdir}
	mv ${backupdir}/$datepath/html ${parentdir}
	if [ $? -ne 0 ];then 
		print_log "deploy fedweb  failed"
		exit 2
	fi
	print_log "backup fedweb successfully"  "INFO"
	sleep 1

	# step2 : start web service
	print_log "finish rollback , all successfully" "INFO"
	exit 0 
}

function main()
{
	init_var $@
	if [ $1 == "deploy" ];then
		deploy
	elif [ $1 == "rollback" ];then
		rollback
	else
		echo "you had enter unexpected word,xargs only support ['rollback','deploy'],please check again!"
	fi
}

main $@
