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


#rm -rf build
#mkdir build
#cp $(pwd)/scripts/LoopTestOverride.xcconfig ./build/LoopTestOverride.xcconfig
cp $(pwd)/scripts/Loop.test.entitlements ./build/LoopWorkspace/Loop/Loop/Loop.entitlements
cd  build
# git clone --branch="$branch" --recurse-submodules https://github.com/tidepool-org/LoopWorkspace >"$buildLog"
xcodebuild -workspace ./LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration "$buildType" -xcconfig LoopTestOverride.xcconfig -destination 'name=iPhone 11 Pro' build SYMROOT="$(pwd)" >"$buildLog"