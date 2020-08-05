# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Build
- `npm run build`

## Test

All tests

`npm run test-all`

### Smoke test
Accessibility tests that run through the screen elements making sure the are present

- `npm run test-smoke1`
- `npm run test-smoke2`

### Functional test
Test basic functionality of the app. Opening, closing of screens, adding and removeing devices, clicking buttons etc ...

- `npm run test-functional`

### Guardrails test
Test the loop app settings guardrails limits

- `npm run test-guardrails`

## Debugging

`detox test e2e/smoke -c ios.sim.debug 2>&1 | tee ./artifacts/smoketest_output.txt`

 - then you can search in `./artifacts/test_output.txt` file for test output including errors or mismatches

## Updates
`detox clean-framework-cache && detox build-framework-cache`

## Requirements

A recent version of `node` must be installed to run these tests.

## Apple Simulator Utils

Do *not* install `applesimutils` from Homebrew. Use the custom, pre-built binary found at `bin/applesimutils`. This binary includes additional functionality to automate allowing or disallowing Critical Alert notifications. This binary was built using Xcode 11.3 from the Tidepool fork found at https://github.com/tidepool-org/AppleSimulatorUtils using the `add-critical-alerts-notification-permission` branch.
