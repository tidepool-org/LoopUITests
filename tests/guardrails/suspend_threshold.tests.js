const { limits } = require('../../src/index');

var suspendThresholdTests = (test) => {
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenSuspendThresholdScreen();
        await screen.OpenPicker();
    });
    it('can set max units with warning', async () => {
        await screen.Apply(
            { value: limits.suspendThreshold.max.limit }
        );
        await expect(screen.ExclamationMark().atIndex(1)).toBeVisible();
    });
    // it('can set max lower boundary units with warning', async () => {
    //     await screen.Apply(
    //         { value: limits.suspendThreshold.max.warning }
    //     );
    //     await expect(screen.ExclamationMark()).toBeVisible();
    // });
    // it('can set below max lower boundary units without warning', async () => {
    //     await screen.Apply(
    //         { value: limits.suspendThreshold.max.warning - limits.suspendThreshold.step }
    //     );
    //     await expect(screen.ExclamationMark()).toBeNotVisible();
    // });
    // it('can set above min upper boundary units without warning', async () => {
    //     await screen.Apply(
    //         { value: limits.suspendThreshold.min.warning + limits.suspendThreshold.step }
    //     );
    //     await expect(screen.ExclamationMark()).toBeNotVisible();
    // });
    // it('can set min upper boundary units with warning', async () => {
    //     await screen.Apply(
    //         { value: limits.suspendThreshold.min.warning }
    //     );
    //     await expect(screen.ExclamationMark()).toBeVisible();
    // });
    // it('can set min units with warning', async () => {
    //     await screen.Apply(
    //         { value: limits.suspendThreshold.min.warning }
    //     );
    //     await expect(screen.ExclamationMark()).toBeVisible();
    // });
    // it('cannot set above max units', async () => {
    //     try {
    //         await screen.Apply(
    //             { value: limits.suspendThreshold.max.limit + limits.suspendThreshold.step }
    //         );
    //     } catch (error) {
    //         //TODO assert cannot be set
    //     }
    // });
    // it('cannot set below the min units', async () => {
    //     try {
    //         await screen.Apply(
    //             { value: limits.suspendThreshold.min.warning - limits.suspendThreshold.step }
    //         );
    //     } catch (error) {
    //         //TODO assert cannot be set
    //     }
    // });
};

module.exports = { suspendThresholdTests };
