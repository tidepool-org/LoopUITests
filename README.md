# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Build

`detox build`

## Test

All tests

`detox test -c ios.sim.debug`

### Smoke test

`detox test e2e/smoke_test -c ios.sim.debug`

### Scenario test

`detox test e2e/scenario_test -c ios.sim.debug`
