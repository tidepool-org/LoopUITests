#!/bin/bash

buildType="Debug"
buildLog="/dev/null 2>&1"
branch="dev"

if [ "$1" != "" ]; then
    buildType="$1"
fi

if [ "$2" != "" ]; then
    buildLog="$2"
fi

if [ "$3" != "" ]; then
    branch="$3"
fi

echo "Building as $buildType build"
echo "Build logs at $buildLog"
echo "Build branch $branch"

rm -rf build
mkdir build
cd  build
git clone --branch="$branch" --recurse-submodules https://github.com/tidepool-org/LoopWorkspace >"$buildLog"
cp $(pwd)/../scripts/Loop.test.entitlements ./LoopWorkspace/Loop/Loop/Loop.entitlements

xcodebuild -workspace ./LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration "$buildType" -destination 'name=iPhone 11 Pro' build SYMROOT="$(pwd)" >"$buildLog"