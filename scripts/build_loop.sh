#!/bin/bash -eu

SCRIPT="$(basename "${0}")"
BUILDS_DIR=build
LOOPWORKSPACE_DIR=LoopWorkspace

error() {
  echo "ERROR: ${*}" >&2
  echo "Usage: ${SCRIPT} <build_tag>" >&2
  echo "Parameters:" >&2
  echo "  <build_tag>	tag of the version to build, or if not found it will be cloned e.g. \`build-277\`" >&2
  exit 1
}

info() {
  echo "INFO: ${*}" >&2
}

if [ ${#} -lt 1 ]; then
  error "Missing arguments"
fi

BUILD_TAG="${1}"
shift 1

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

BUILD_DIR="${BUILDS_DIR}/${BUILD_TAG}"
if [ ! -d "${BUILD_DIR}" ]; then
  mkdir -p "${BUILD_DIR}"
fi

cd ${BUILD_DIR}

if [ ! -d "${LOOPWORKSPACE_DIR}" ]; then
  info "clone LoopWorkspace branch: ${BUILD_TAG}"
  git clone --branch="${BUILD_TAG}" --recurse-submodules git@github.com:tidepool-org/LoopWorkspace.git
else
  info "checkout LoopWorkspace branch: ${BUILD_TAG}"
  cd ${LOOPWORKSPACE_DIR}
  git checkout --recurse-submodules "${BUILD_TAG}"
  cd ..
fi

LoopWorkspace/Scripts/workspace-prepare.sh Tidepool

## LoopOverride.xcconfig with no `CRITICAL_ALERTS_ENABLED`
sed -i '' 's/CRITICAL_ALERTS_ENABLED//g' LoopWorkspace/Tidepool/Loop/LoopOverride.xcconfig

LoopWorkspace/Scripts/workspace-build.sh -o "$(pwd)" Tidepool
