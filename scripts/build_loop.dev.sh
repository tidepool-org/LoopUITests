#!/bin/bash

SCRIPT="$(basename "${0}")"
SCRIPT_DIRECTORY="$(dirname "${0}")"
ROOT_DIRECTORY="${SCRIPT_DIRECTORY}/../"

error() {
  echo "ERROR: ${*}" >&2
  echo "Usage: ${SCRIPT} [-s|--save-current <build_tag>] [-f|--fetch-new <build_tag>]" >&2
  echo "Parameters:" >&2
  echo " -s|--save-current <build_tag>     folder name of build to save e.g. `build_277`" >&2
  echo " -f|--fetch-new <build_tag>      tag name of build to fetch e.g. `build_281`" >&2
  exit 1
}

info() {
  echo "INFO: ${*}" >&2
}

buildLoop(){
  LoopWorkspace/Scripts/workspace-prepare.sh Tidepool

  ## LoopOverride.xcconfig with no `CRITICAL_ALERTS_ENABLED`
  sed -i '' 's/CRITICAL_ALERTS_ENABLED//g' LoopWorkspace/Tidepool/Loop/LoopOverride.xcconfig

  LoopWorkspace/Scripts/workspace-build.sh -o "$(pwd)" Tidepool

  cp -r "$(pwd)"/Build/Products/*  "$(pwd)"
}

if [ ${#} -lt 1 ]; then
  error "Missing arguments"
fi

SAVE_BUILD=
FETCH_BUILD=
BUILD_ONLY=NO
while [[ $# -gt 0 ]]
do
  arg="$1"

  case $arg in
    -s|--save-current)
      SAVE_BUILD="${2}"
      shift 2
      echo SAVE_BUILD = $SAVE_BUILD
      ;;
    -f|--fetch-new)
      FETCH_BUILD="${2}"
      shift 2
      echo FETCH_BUILD = $FETCH_BUILD
      ;;
    -b|--build-only)
      BUILD_ONLY=YES
      shift 1
      echo BUILD_ONLY = $BUILD_ONLY
      ;;
    *)
      break
      ;;
  esac
done

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

if [ "${SAVE_BUILD}" != "" ]; then
    echo "Saving build as ${SAVE_BUILD}"
    mkdir -p "${SAVE_BUILD}"/Debug-iphonesimulator/Loop.app
    cp -r build/Debug-iphonesimulator/Loop.app/* "${SAVE_BUILD}"/Debug-iphonesimulator/Loop.app
fi

if [ "${FETCH_BUILD}" != "" ]; then
    echo "Get latest from ${FETCH_BUILD}"
    rm -rf build
    mkdir build
    cd build
    git clone --branch="${FETCH_BUILD}" --recurse-submodules git@github.com:tidepool-org/LoopWorkspace.git
fi

if [ "${BUILD_ONLY}" == "YES" -a "${FETCH_BUILD}" == "" ]; then
  cd build
fi

buildLoop
