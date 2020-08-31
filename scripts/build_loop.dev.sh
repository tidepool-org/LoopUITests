#!/bin/bash

if [ "$1" != "" ]; then
    branch="$1"
    echo "Get latest from $branch"
    rm -rf build
    mkdir build
    cd build
    git clone --branch="$branch" --recurse-submodules git@github.com:tidepool-org/LoopWorkspace.git
else
    cd build
fi

LoopWorkspace/Scripts/workspace-prepare.sh Tidepool

## TODO LoopOverride.xcconfig with no `CRITICAL_ALERTS_ENABLED`

LoopWorkspace/Scripts/workspace-build.sh -o "$(pwd)" Tidepool

cp -r "$(pwd)"/Build/Products/*  "$(pwd)"
