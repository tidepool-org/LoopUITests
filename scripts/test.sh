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

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

cd "${TEST_DIRECTORY}"

info "Checking git commits..."
git log HEAD...dev

info "Checking node version..."
node --version

if [ ! -d "node_modules" ]; then
  info "Installing node dependencies..."
  npm install
  npm list
fi

info "Updating PATH..."
export PATH="${PWD}/bin:${PWD}/node_modules/.bin:${PATH}"
echo "PATH=${PATH}"

info "Creating build symlink to '${BUILD_ROOT}'..."
ln -sfv "${BUILD_ROOT}" build

info "Dumping environment variables..."
set

info "Checking locations..."
which detox
which applesimutils

info "Checking simulators..."
xcrun simctl list

info "Running detox smoke tests with configuration '${CONFIGURATION}'..."
detox test e2e/smoke_test --configuration "${CONFIGURATION}" --loglevel warn --record-logs failing --cleanup
