const { Test, Config } = require('../../src/index');
const accessibility = require('../../tests/accessibility/index');

describe('accessibility', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.setup({
            language: config.text,
            screenDefaults: config.screenDefaults,
        });
        await test.prepare();
    });
    describe('main screens', () => {
        describe('home', () => {
            accessibility.homeScreenTest(test);
        });
        describe('home glucose', () => {
            accessibility.homeGlucoseScreenTest(test);
        });
        describe('home active insulin', () => {
            accessibility.homeActiveInsulinScreenTest(test);
        });
        describe('home insulin delivery', () => {
            accessibility.homeInsulinDeliveryScreenTest(test);
        });
        describe('home active carbohydrates', () => {
            accessibility.homeActiveCarbohydratesScreenTest(test);
        });
        describe('carb entry', () => {
            accessibility.carbEntryScreenTest(test);
        });
        describe('bolus', () => {
            accessibility.bolusScreenTest(test);
        });
    });
});
