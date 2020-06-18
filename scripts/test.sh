#!/bin/sh -eu

#
#  test.sh
#  LoopUITests
#
#  Created by Darin Krauss on 2/7/20.
#  Copyright © 2020 Tidepool Project. All rights reserved.
#

SCRIPT="$(basename "${0}")"
SCRIPT_DIRECTORY="$(dirname "${0}")"
TEST_DIRECTORY="${SCRIPT_DIRECTORY}/.."

error() {
  echo "ERROR: ${*}" >&2
  echo "Usage: ${SCRIPT} <build-root> <configuration>" >&2
  echo "Parameters:" >&2
  echo "  <build-root>      root of the build that contains the app" >&2
  echo "  <configuration>   detox configuration to use" >&2
  echo "  <type>            type of tests to run, 'functional' or 'smoke' or 'guardrails' " >&2
  exit 1
}

info() {
  echo "INFO: ${*}" >&2
}

if [ ${#} -lt 1 ]; then
  error "Missing arguments"
fi

BUILD_ROOT="${1}"
shift 1
CONFIGURATION="${1}"
shift 1
TEST_TYPE="${1}"
shift 1

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

cd "${TEST_DIRECTORY}"

info "Checking node version..."
node --version

if [ ! -d "node_modules" ]; then
  info "Installing node dependencies..."
  npm install
fi

info "Updating PATH..."
export PATH="${PWD}/bin:${PWD}/node_modules/.bin:${PATH}"

info "Creating build symlink to '${BUILD_ROOT}'..."
ln -sf "${BUILD_ROOT}" build

if [ "${TEST_TYPE}" = "functional" ]; then
  info "Running detox functional tests with configuration '${CONFIGURATION}'..."
  detox test e2e/functional --configuration "${CONFIGURATION}" --loglevel info --record-logs failing --bail --cleanup
fi
if [ "${TEST_TYPE}" = "smoke" ]; then
  info "Running smoke tests '${CONFIGURATION}'..."
  detox test e2e/smoke --configuration "${CONFIGURATION}" --loglevel info --record-logs failing --bail --cleanup
fi
if [ "${TEST_TYPE}" = "guardrails" ]; then
  info "Running guardrails tests '${CONFIGURATION}'..."
  detox test e2e/guardrails --configuration "${CONFIGURATION}" --loglevel info --record-logs failing --bail --cleanup
fi
