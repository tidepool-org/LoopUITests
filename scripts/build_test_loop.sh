#!/bin/sh -f

BUILD_DIR="$1"

pushd $BUILD_DIR
detox build --configuration ios.sim.release
#detox test --configuration ios.sim.release --cleanup
popd