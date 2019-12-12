#!/bin/sh -f

BUILD_DIR="$1"

pushd $BUILD_DIR
run_f "detox build --configuration ios.sim.release"
#run_f "detox test --configuration ios.sim.release --cleanup"
popd