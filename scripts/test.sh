#!/bin/sh -eu

#
#  test.sh
#  LoopUITests
#
#  Created by Darin Krauss on 2/7/20.
#  Copyright © 2020 Tidepool Project. All rights reserved.
#

SCRIPT="$(basename "${0}")"

error() {
  echo "ERROR: ${*}" >&2
  echo "Usage: ${SCRIPT} <build-dir> <configuration> <type>" >&2
  echo "Parameters:" >&2
  echo "  <build-dir>      directory of the build that contains the app" >&2
  echo "  <configuration>   detox configuration to use" >&2
  echo "  <type>            type of tests to run, 'functional' or 'smoke' or 'guardrails' or 'error' " >&2
  exit 1
}

info() {
  echo "INFO: ${*}" >&2
}

if [ ${#} -lt 1 ]; then
  error "Missing arguments"
fi

BUILD_DIR="${1}"
shift 1
CONFIGURATION="${1}"
shift 1
TEST_TYPE="${1}"
shift 1

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

if [ ! -d "${BUILD_DIR}" ]; then
  error "Build directory does not exist"
fi

if [[ ! ${TEST_TYPE} =~ "functional_" ]] && [[ ! ${TEST_TYPE} =~ "smoke_" ]] && [[ ! ${TEST_TYPE} =~ "guardrails_" ]] && [[ ! ${TEST_TYPE} =~ "error_" ]]; then
  error "Unexpected <type>: ${TEST_TYPE}"
fi

if [[ ! ${CONFIGURATION} =~ "iphone-11pro" ]] && [[ ! ${CONFIGURATION} =~ "iphone-se-2" ]]; then
  error "Unexpected <configuration>: ${CONFIGURATION}"
fi

if [[ ${CONFIGURATION} =~ "iphone-11pro" ]]; then
  CONFIGURATION="ios.sim.debug.iphone-11pro"
fi

if [[ ${CONFIGURATION} =~ "iphone-se-2" ]]; then
  CONFIGURATION="ios.sim.debug.iphone-se-2"
fi

info "Checking node version..."
node --version

if [ ! -d "node_modules" ]; then
  info "Installing node dependencies..."
  npm install
fi

info "Updating PATH..."
export PATH="${PWD}/bin:${PWD}/node_modules/.bin:${PATH}"

info "Creating build symlink to '${BUILD_DIR}'..."
ln -sf "${PWD}/${BUILD_DIR}/Build" build

info "Running detox '${TEST_TYPE}' tests with configuration '${CONFIGURATION}'..."
detox test e2e/${TEST_TYPE} --configuration "${CONFIGURATION}" --loglevel info --record-logs failing --bail --cleanup

