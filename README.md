# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Build
- `npm run build`

## Test

All tests

`npm run test-all`

## Device Configurations

- iPhone 11 Pro `ios.sim.debug.iphone-11pro`
- iPhone 6 `ios.sim.debug.iphone-6`
- iPhone SE (2nd generation) `ios.sim.debug.iphone-se-2`

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


## Scenarios

[Scenarios Docs](https://github.com/LoopKit/Loop/blob/master/Documentation/Testing/Scenarios.md)

### Scenarios

- `./scenarios/flat_cgm_trace.json` flat cgm trace, no insulin or carb events

## Testing guidelines

https://developer.mozilla.org/en-US/docs/Web/Accessibility/Mobile_accessibility_checklist
http://pauljadam.com/demos/mobilechecklist.html



https://martinfowler.com/articles/practical-test-pyramid.html#UiTests

> With web interfaces there's multiple aspects that you probably want to test around your UI: behaviour, layout, usability

1)  - language (enUS, multiple over time ...)
    - units (mgdL, mgL)
    - device format (touch, )

https://martinfowler.com/articles/practical-test-pyramid.html#End-to-endTests

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


https://martinfowler.com/articles/practical-test-pyramid.html#AvoidTestDuplication

> If a higher-level test spots an error and there's no lower-level test failing, you need to write a lower-level test
> Push your tests as far down the test pyramid as you can

