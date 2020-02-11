# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Build

- `detox build -c ios.sim.debug`
- `detox build -c ios.sim.release`

## Test

All tests

`detox test -c ios.sim.debug`

### Smoke test

`detox test e2e/smoke_test -c ios.sim.debug`

### Scenario test

`detox test e2e/scenario_test -c ios.sim.debug`

## Debugging

`detox test e2e/smoke_test -c ios.sim.debug 2>&1 | tee ./artifacts/test_output.txt`

 - then you can search in `./artifacts/test_output.txt` file for test output including errors or mismatches
