const { limits } = require('../../src/index');

var suspendThresholdTests = (test) => {
    it('can set max units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.limit }
        );
        //TODO assert on warning
    });
    it('can set max lower boundary units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.warning }
        );
        //TODO assert on warning
    });
    it('can set below max lower boundary units without warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.max.warning - limits.suspendThreshold.step }
        );
        //TODO assert NO warning
    });
    it('can set above min upper boundary units without warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.warning + limits.suspendThreshold.step }
        );
        //TODO assert NO warning
    });
    it('can set min upper boundary units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.warning }
        );
        //TODO assert on warning
    });
    it('can set min units with warning', async () => {
        await test.settingsScreen.SetSuspendThreshold(
            { value: limits.suspendThreshold.min.warning }
        );
        //TODO assert on warning
    });
    it('cannot set above max units', async () => {
        try {
            await test.settingsScreen.SetSuspendThreshold(
                { value: limits.suspendThreshold.max.limit + limits.suspendThreshold.step }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the min units', async () => {
        try {
            await test.settingsScreen.SetSuspendThreshold(
                { value: limits.suspendThreshold.min.warning - limits.suspendThreshold.step }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
};

module.exports = { suspendThresholdTests };
