# LoopUITests
Loop end-to-end automated tests


## Build

`detox build`

## Test

All tests

`detox test -c ios.sim.debug`

### Smoke test

`detox test e2e/smoke_test -c ios.sim.debug`

### Scenario test

`detox test e2e/scenario_test -c ios.sim.debug`
