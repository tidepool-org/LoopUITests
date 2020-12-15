# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Loop Build
Will either build the version of loop given e.g. `build-289` or if it doesn't already exist will clone the LoopWorkspace for the given tag and then build it

- `BUILD_TAG=build-289 npm run build_loop`

## Tests

`BUILD_DIR=${PWD}/build/build-289/Build/Products CONFIG=iphone-se-2 NAME=error_1 npm run test_e2e`

### Device Configurations

[Comparison iPhone SE 2 vs iPhone 11 pro](https://www.apple.com/iphone/compare/?device1=iphoneSE2ndgen&device2=iphone12)

- iPhone 11 Pro `ios.sim.debug.iphone-11pro`
- iPhone SE (2nd generation) `ios.sim.debug.iphone-se-2`


### Smoke test
Accessibility and tests that run through the screen elements making sure the are present

- `smoke_1` accessibility labels for: main screens
- `smoke_2` accessibility labels for: general settings and therapy settings screens
- `smoke_3` install, confirgure and go into closed loop mode, then close and reopen loop app

### Functional test
Test basic functionality of the app. Opening, closing of screens, adding and removeing devices, clicking buttons etc ...

- `functional_1`
- `functional_2`

### Guardrails test
Test the loop app settings guardrails limits

- `guardrail_1` guardrail tests for: insulin carb ratio, correction range schedule and basal rate schedule
- `guardrail_2` guardrail tests for: insulin sensitivity schedule, delivery limits and glucose safety limit

### Errors test
Test the loop app interacts with device errors

- `error_1`
- `error_2`

## Debugging

 search in `./artifacts/loopUITests.html` file for test output including errors or mismatches

## Updates
`detox clean-framework-cache && detox build-framework-cache`

## Requirements

A recent version of `node` must be installed to run these tests.

## Apple Simulator Utils

Do *not* install `applesimutils` from Homebrew. Use the custom, pre-built binary found at `bin/applesimutils`. This binary includes additional functionality to automate allowing or disallowing Critical Alert notifications. This binary was built using Xcode 11.3 from the Tidepool fork found at https://github.com/tidepool-org/AppleSimulatorUtils using the `add-critical-alerts-notification-permission` branch.


## Scenarios

[Scenarios Docs](https://github.com/LoopKit/Loop/blob/master/Documentation/Testing/Scenarios.md)

- `./scenarios/flat_cgm_trace.json` flat cgm trace, no insulin or carb events

## Testing guidelines


### Mobile

http://pauljadam.com/demos/mobilechecklist.html


### Practical test pyramid

[UI Tests](https://martinfowler.com/articles/practical-test-pyramid.html#UiTests)

> With web interfaces there's multiple aspects that you probably want to test around your UI: behaviour, layout, usability

1)  - language (enUS, multiple over time ...)
    - units (mgdL, mgL)
    - device format (touch, )

[End to end tests](https://martinfowler.com/articles/practical-test-pyramid.html#End-to-endTests)

> Think about the high-value interactions users will have with your application. Try to come up with user journeys that define the core value of your product and translate the most important steps of these user journeys into automated end-to-end tests.

1)
- initial setup of loop
    - threapy settings (via persription service)
    - add CGM
    - add pump

2)
- day to day use of loop
    - add meal
    - bolus for meal
    - update a setting

3)
- errors

[Avoid duplication](https://martinfowler.com/articles/practical-test-pyramid.html#AvoidTestDuplication)

> If a higher-level test spots an error and there's no lower-level test failing, you need to write a lower-level test
> Push your tests as far down the test pyramid as you can

