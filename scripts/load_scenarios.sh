#!/bin/bash

workingDir="$(pwd)"

if [ "$1" != "" ]; then
    deviceId="$1"
fi

echo "device ID $deviceId"

appDir=~/Library/Developer/CoreSimulator/Devices/$1/data/Containers/Data/Application

echo "app dir $appDir"

cd $appDir
applicationId="$(ls -t | head -n1)"

echo "app ID $applicationId"

cd $workingDir

mkdir $appDir/$applicationId/Documents/scenarios

cp "$(pwd)"/scenarios/*  $appDir/$applicationId/Documents/scenarios/
