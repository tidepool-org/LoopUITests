#!/bin/bash

rm -rf build
mkdir build
cd  build
git clone --branch=darinkrauss/dev --recurse-submodules https://github.com/tidepool-org/LoopWorkspace >/dev/null 2>&1
xcodebuild -workspace ./LoopWorkspace/Loop.xcworkspace -scheme 'Loop (Workspace)' -configuration Debug -destination 'name=iPhone 8' build SYMROOT="$(pwd)" >/dev/null 2>&1