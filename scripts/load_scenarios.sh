#!/bin/bash

workingDir="$(pwd)"

if [ "$1" != "" ]; then
    deviceId="$1"
fi

appDir=~/Library/Developer/CoreSimulator/Devices/$1/data/Containers/Data/Application

cd $appDir
applicationId="$(ls -t | head -n1)"

cd $workingDir

mkdir $appDir/$applicationId/Documents/scenarios

cp "$(pwd)"/scenarios/*  $appDir/$applicationId/Documents/scenarios/
