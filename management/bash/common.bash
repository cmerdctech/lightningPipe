#!/bin/bash
echo "LIGHTNINGPIPE ALIASES ETC (editlpscripts)";

export lpTestInfo="\
----------------------------------\n\
TESTING COMMANDS\n\n\
runLpTestServer - start LightningPipe server\n\
pingLp - ping LP test server\n\
curlm - acccess LP as mssql user\n\
curlj - access LP as jmc user\n\\n\


lpdir - cd to LP server code\n\
lpInfo - repeat this information\n\n\
viewLog - look at all log info\n\n\
tailLog - look at recent log info\n\n\
editlpscripts - edit this file\n\
----------------------------------\n\
";

if [ ! -e "$lpProjectBase/logFiles" ]
then
  echo -e "\ncreating $lpProjectBase/logFiles\n"
  mkdir "$lpProjectBase/logFiles"
fi

if [ ! -e "$lpProjectBase/testResults" ]
then
  echo -e "\ncreating $lpProjectBase/testResults\n"
  mkdir "$lpProjectBase/testResults"
fi

if [ ! -e "$lpProjectBase/testData" ]
then
  echo -e "\nWARNING: $lpProjectBase/testData IS MISSING\n"
fi

if [ ! -e "$lpProjectBase/config" ]
then
  echo -e "\nWARNING: $lpProjectBase/config IS MISSING\n"
fi


echo -e "$lpTestInfo";
alias lpInfo=' echo -e "$lpTestInfo"'

export PATH=$PATH:"$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )": #include other executable scripts in this directory

echo -e "\ncd lpProjectBase ======"; cd $lpProjectBase; pwd; #note: this is a synonym of lprepo, repo is different in some other projects

# === symbolic link allows paths fixed in control files to be redirected for various test purposes ===

if [ ! -d $testLinkDir ]; then
mkdir $testLinkDir
fi

if [ -e "$testLinkDir/lightningPipeHome" ]; then
	rm $testLinkDir/lightningPipeHome;
fi
if [ -e "$testLinkDir/lpTestDataSource" ]; then
	rm $testLinkDir/lpTestDataSource;
fi
if [ -e "$testLinkDir/lpTestDataDest" ]; then
	rm $testLinkDir/lpTestDataDest;
fi

ln -s $lpProjectBase $testLinkDir/lightningPipeHome

ln -s $testLinkDir/cloverleafHome/testDataFiles/ $testLinkDir/lpTestDataSource; #for use in json files
ln -s $testLinkDir/cloverleafHome/testResults/ $testLinkDir/lpTestDataDest; #for use in json files




# create environment variables for important locations ================================

export lpSystemDir="$testLinkDir/lightningPipeHome/system"
export lightningPipeDir="$testLinkDir/lightningPipeHome/system/responder"
export lpLoggingDir="$testLinkDir/lightningPipeHome/logFiles"

export testSourceDir="$testLinkDir/lptestDataSource"; #for use in bash files


if [ ! -d $lpLoggingDir ]; then
echo -e "CREATING DIRECTORY: $lpLoggingDir";
mkdir $lpLoggingDir
fi
if [ ! -d $testDestDir ]; then
echo -e "CREATING DIRECTORY: $testDestDir";
mkdir $testDestDir
fi

# === UTILITY AND NAVIGATION aliases ===========================================
alias lprepo="cd $lpProjectBase/system; pwd; git status;";
alias editlpscripts="edit $lpTestScriptsDir/common.bash"
alias lpTestDir="cd $lpProjectBase/testData"

alias lpdir="cd $lightningPipeDir; echo -e '\n'; ls -la; pwd;"


# === BASIC OPERATION aliases/variables ===========================================
alias lpserve="clear; nodemon -w $testLinkDir/lightningPipeHome $testLinkDir/lightningPipeHome/system/responder/server.js";


# === TEST RUNNING ===========================================
alias pingLp="curl http://127.0.0.1:8000/ping"

if [ "$serverContext" == "qbook" ]; then
alias viewLog="cat $lpLoggingDir/lightningClover.log | bunyan | tail -c -10000; echo 'ANY FATAL?'; cat $lpLoggingDir/lightningClover.log | bunyan -l fatal; echo 'done';"
else
alias viewLog="cat $lpLoggingDir/lightningClover.log | bunyan | tail --lines=133; echo 'ANY FATAL?'; cat $lpLoggingDir/lightningClover.log | bunyan -l fatal; echo 'done';"

fi

alias tailLog="tail -f -n 20 $lpLoggingDir/lightningClover.log | bunyan"
alias killLog="rm $lpLoggingDir/lightningClover.log"



