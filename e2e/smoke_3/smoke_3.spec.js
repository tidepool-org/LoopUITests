const { Test, Config } = require('../../src/index');
const settingsAccessibility = require('../../tests/accessibility/settings/index');
const deviceAccessibility = require('../../tests/accessibility/devices/index');

describe('loop smoke test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withSettingDefault(config.settingDefault)
            .withScreenDefaults(config.screenDefaults)
            .withTherapySettings()
            .withSimulators({ cgm: true, pump: true });
        await test.prepare();
    });
    describe('go into closed loop', () => {
        var settingsScreen;
        it('open settings', async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        it('go into to closed loop', async () => {
            await settingsScreen.ClosedLoop();
            await settingsScreen.Back();
        });
    });
    describe('start cgm data', () => {
        var cgmScreen;
        it('open cgm simulator', async () => {
            cgmScreen = await test.openCGMScreen();
        });
        it('use constant data', async () => {
            await cgmScreen.Apply({ model: { name: cgmScreen.screenText.Model.Constant, bgValues: [99] } });
            await cgmScreen.Back();
        });
        it('backfill cgm data', async () => {
            cgmScreen = await test.openCGMScreen();
            await cgmScreen.Apply({ history: { name: cgmScreen.screenText.History.BackfillGlucose, backfillHours: 5, } });
        });
        it('set cgm data sampling frequency', async () => {
            cgmScreen = await test.openCGMScreen();
            await cgmScreen.Apply({ frequency: { seconds: true } });
            await cgmScreen.Back();
        });
    });
});
