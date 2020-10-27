# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Loop Build
Save the current build (if any) and fetch the new one based on the branch name

### Fetch new build
- `source ./scripts/build_loop.dev.sh --fetch-new build-289`

### Save existing and fetch new build
- `source ./scripts/build_loop.dev.sh --save-current build-272 --fetch-new build-289`

## Tests

### Device Configurations

[Comparison iPhone SE 2 vs iPhone 6 vs iPhone 11 pro](https://www.apple.com/iphone/compare/?device1=iphone6&device2=iphoneSE2ndgen&device3=iphone12)

- iPhone 11 Pro `ios.sim.debug.iphone-11pro`
- iPhone SE (2nd generation) `ios.sim.debug.iphone-se-2`

### Smoke test
Accessibility and tests that run through the screen elements making sure the are present

- `npm run test_smoke1`
- `npm run test_smoke2`
- `npm run test_smoke3`

### Functional test
Test basic functionality of the app. Opening, closing of screens, adding and removeing devices, clicking buttons etc ...

- `npm run test_functional_1`
- `npm run test_functional_2`

### Guardrails test
Test the loop app settings guardrails limits

- `npm run test_guardrail_1`
- `npm run test_guardrail_2`

### Errors test
Test the loop app interacts with device errors

- `npm run test_error_1`
- `npm run test_error_2`

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

- `./scenarios/flat_cgm_trace.json` flat cgm trace, no insulin or carb events

## Testing guidelines


### Mobile

http://pauljadam.com/demos/mobilechecklist.html


### Practicle test pyramid

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

