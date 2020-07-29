const { Test, Config } = require('../../src/index');
const accessibilityTests = require('../../tests/accessibility/index');

describe('accessibility', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withSettingDefault(config.settingDefault)
            .withScreenDefaults(config.screenDefaults)
            .withStartScreen('home');
        await test.prepare();
    });
    describe('main screens', () => {
        // describe('home', () => {
        //     accessibilityTests.homeScreen(test);
        // });
        // describe('home glucose', () => {
        //     accessibilityTests.homeGlucoseScreen(test);
        // });
        // describe('home active insulin', () => {
        //     accessibilityTests.homeActiveInsulinScreen(test);
        // });
        // describe('home insulin delivery', () => {
        //     accessibilityTests.homeInsulinDeliveryScreen(test);
        // });
        // describe('home active carbohydrates', () => {
        //     accessibilityTests.homeActiveCarbohydratesScreen(test);
        // });
        describe('carb entry', () => {
            accessibilityTests.carbEntryScreen(test);
        });
        describe('bolus', () => {
            accessibilityTests.bolusScreen(test);
        });
    });
});
