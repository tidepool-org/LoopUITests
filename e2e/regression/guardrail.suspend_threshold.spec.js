const { Test, screenName, limits } = require('../../src/index');

describe('guardrail suspend threshold', () => {
    var test;
    it('should setup with pump simulator', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('can set maximum units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.maximum }
        );
        //TODO assert on warning
    });
    it('can set maximum lower boundary units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.lowerBoundary }
        );
        //TODO assert on warning
    });
    it('can set below maximum lower boundary units without warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.lowerBoundary - limits.suspendThreshold.unitIncrement }
        );
        //TODO assert NO warning
    });
    it('can set above minimum upper boundary units without warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.upperBoundary + limits.suspendThreshold.unitIncrement }
        );
        //TODO assert NO warning
    });
    it('can set minimum upper boundary units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.upperBoundary }
        );
        //TODO assert on warning
    });
    it('can set minimum units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.minimum }
        );
        //TODO assert on warning
    });
    it('cannot set above maximum units', async () => {
        try {
            await test.settingsScreen.SetSuspendThreshold(
                { value: limits.suspendThreshold.max.maximum + limits.suspendThreshold.unitIncrement }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the minimum units', async () => {
        try {
            await test.settingsScreen.SetSuspendThreshold(
                { value: limits.suspendThreshold.min.minimum - limits.suspendThreshold.unitIncrement }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });

});
