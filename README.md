# LoopUITests
Loop end-to-end automated tests using `detox`

 - [Detox Framework](https://github.com/wix/Detox)
 - [Background reading](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)


## Running the Tests Locally

### Requirements
node ^12.5
`npm install -g detox-cli`
`npm install` 

### Installing apple simulator utilities

Do **not** install `applesimutils` from Homebrew. Use the custom, pre-built binary found at `bin/applesimutils`. 

When running locally you may need to add a copy of this version of applesimutils to your PATH.<br>e.g. `usr/local/bin`  

This binary includes additional functionality to automate allowing or disallowing Critical Alert notifications.<br>This binary was built using Xcode 11.3 from the Tidepool fork found at https://github.com/tidepool-org/AppleSimulatorUtils using the `add-critical-alerts-notification-permission` branch.

### Build loop
You will first need to build the version of Loop you would like to run the tests on. To do this run

    BUILD_TAG=<buildtag> npm run build_loop

 e.g. `BUILD_TAG=build-1.1.0-2246 npm run build_loop`


### Running the desired test suite
In order to run the tests you will need to run

`BUILD_DIR=${PWD}/build/<buildtag>/Build/Products CONFIG=<device> NAME=<test> npm run test_e2e`

where 

- `<build-tag>` is the same as the one you chose for building loop in the above command e.g `build-1.1.0-2246`
- `<device>` is the device you'd like to run it on. either 
 - iPhone 11 Pro `iphone-11pro`
 - iPhone SE (2nd generation) `iphone-se-2`
- `<test>` is the suite of the tests you'd like to run. either
 -  `accessibility`
 - `errors`
 - `functional`
 - `smoke`
 
e.g `BUILD_DIR=${PWD}/build/build-1.1.0-2246/Build/Products CONFIG=iphone-11pro NAME=accessibility npm run test_e2e`

### Test suite descriptions 
#### accessibility
Accessibility tests that run through the accessibility labels of required screen elements making sure the are present

#### errors
Tests error generation on the cgm simulator and pump simulator such as 'signal loss' and 'generate error on suspend', respectively.

#### functional
Tests functional behavior within the loop app such as entering carbs, delivering a bolus, and verifying guardrails in the therapy settings.

#### smoke
Test the loop app can go through basic functionality at a high level such as opening and delivering a bolus.

### Debugging

 search in `./artifacts/loopUITests.html` file for test output including errors or mismatches

### Updates
`detox clean-framework-cache && detox build-framework-cache`



### Scenarios

[Scenarios Docs](https://github.com/LoopKit/Loop/blob/master/Documentation/Testing/Scenarios.md)

- `./scenarios/flat_cgm_trace.json` flat cgm trace, no insulin or carb events

## Developing the tests

### Structure
These tests are based off of the `page-objects` theory, where different screens in the app are seperated into their own class with `getter` functions used to select UI elements. This is a common practice to provide seperation of concerns in test automation between testing code and selectors, which ultimately make it easier to read and update.

#### Folders
**e2e** : this is where the tests live<br>
**screens**: this is where each loop screen and its corresponding UI elements live<br>
**scripts**: this is how we build loop and test<br>
**utilities**: this is where Detox matchers and actions live. This is also where test preparation lives (i.e. turning closed loop on or off or setting up the pump simulators before a test). The translations folder also lives here. 

#### Flow

Test file (<name>.spec.js) creates a `setup` object before the tests begin to run.
the setup object may look something like this
 
    //homescreen.accessibility.spec.js
    describe('Home Screen Accessibility', () => {
      let setup;
      beforeAll(async () => {
        setup = {
          language: 'enUS',
          mockTherapySettings: true,
          cgmSimulator: true,
          cgmStandardData: true,
        };
      });
      
this `setup` object is used by `testPrepare.js` in order to setup the test with the required simulators and loop settings. 
    
    //testPrepare.js
    it('prepares loop', async () => {
    await launchLoop();
    await prepareLoop(setup);
    });

This setup also includes the language property which is what all the screens use to determine the language of the UI elements to grab. 
    
    //homescreen.accessibility.spec.js
    describe('has HUD elements', () => {
    let homeScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
    });
After setup the test file runs the tests. It refers to each screen as opposed to using the raw detox `element(by.label(label))`. 

    //homescreen.accessibility.spec.js
    describe('has HUD elements', () => {
     let homeScreen;
     beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
    });
    it('has a CGM pill', async () => {
      await expect(homeScreen.CGMPill).toBeVisible();
    });
The screen file that coordinates to the test example above is the HomeScreen. In this file we can see the CGMPill getter function that gets the UI matcher of the CGM Pill.

    //HomeScreen.js
    const match = require('../utilities/match');

    module.exports = class HomeScreen {
      constructor(language) {
        this.language = language;
      }

      get CGMPill() {
        return match.Label(this.language.HomeScreen.HUD.CGMPill);
      }
The getter function uses `match.label` which is a reference back to `match.js` which is the detox matching functions simplified resulting in more readable code. `action.js` is the detox actions simplified and they both live in the `utilites` folder. this function also uses `this.language` which was passed in from the setup object as `enUS` which correlates to the `enUSText` that lives in the translations folder. So this function is looking in the `enUSText` file for the HomeScreen property. Let's look at that

    //enUsText.js
    const HomeScreen = {
     HUD: {

        AddCGM: 'Add CGM',
        CGMPill: 'CGM Status',

The `enUSText` is just a bunch of objects that have properties that relate to their screen labels in English and this where the functions look to find the labels of the UI elements.

#### Creating a test
1. You'll start off by creating a `spec.js` file. eg. `deliverbolus.spec.js`
2. You'll then decide if you need to create a screen. Look in the screens folder. If there isn't a screen in there that you'll be working with, you'll need to create a new one. You're screen will be a class that has one constructor `language`. 
4. In your spec file you'll decide how you want to set up loop. you'll be required to have at least the `language` property in your `setup` object. For right now, the only opton is `enUS` which correlates to English (US). 
5. You'll then start developing your test. Initalize your screen that you will be working with like so 
        
        //deliverbolus.spec.js
        describe('has HUD elements', () => {
        let homeScreen;
        beforeAll(async () => {
        homeScreen = new HomeScreen(setLanguage(setup));
        bolusScreen = new BolusScreen(setLanguage(setup));
         });
    you may need to initialize more than one screen depending on the test<br>

6. start framing out your first test like so. `.tap()` is how you will tap on things and to perform assertions you will use something like `expect(<somelement>).toBeVisible`. look at the `match.js` files and `action.js` files for more options. An example

        //deliverbolus.spec.js
       it('delivers a bolus', async () => {
          await homeScreen.DeliverBolusButton.tap();
          await expect(bolusScreen.BolusHeader).toBeVisible();
        });
 7. add getter functions to your screen to retrieve UI elements
       
           //BolusScreen.js      
           get BolusHeader() {
            return match.Label(this.language.BolusScreen.Header);
           }
 8. Refer to enUSText for Labels and create more if necessary.

        //enUsText.js
        const BolusScreen = {
          Header: 'Bolus',