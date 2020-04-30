const { limits } = require('../../src/index');

var correctionRangeScheduleTests = (test) => {
    it('cannot set above max', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        try {
            await screen.Apply({
                time: '12:00 AM',
                min: limits.correctionRange.max.limit,
                max: limits.correctionRange.max.limit + limits.correctionRange.step
            });
        } catch (error) {
            await screen.Cancel();
        }
    });
    it('can set at max', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.max.limit,
            max: limits.correctionRange.max.limit,
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('can set below max', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.max.limit,
            max: limits.correctionRange.max.limit - limits.correctionRange.step
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('can set at max warning', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.max.limit,
            max: limits.correctionRange.max.warning
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('can set at below max warning', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.max.limit,
            max: limits.correctionRange.max.warning - limits.correctionRange.step
        });
        //TODO assert NO warning
        await screen.Cancel();
    });
    it('can set above min warning', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.min.warning + limits.correctionRange.step,
            max: limits.correctionRange.max.limit
        });
        //TODO assert NO warning
        await screen.Cancel();
    });

    it('can set at min warning', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.min.warning,
            max: limits.correctionRange.max.limit
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('can set at above min', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.min.limit + limits.correctionRange.step,
            max: limits.correctionRange.max.limit
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('can set at min', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.Apply({
            time: '12:00 AM',
            min: limits.correctionRange.min.limit,
            max: limits.correctionRange.max.limit
        });
        //TODO assert warning
        await screen.Cancel();
    });
    it('cannot set below min', async () => {
        var screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        try {
            await screen.Apply({
                time: '12:00 AM',
                min: limits.correctionRange.min.limit - limits.correctionRange.step,
                max: limits.correctionRange.max.limit
            });
        } catch (error) {
            await screen.Cancel();
        }
    });
};

module.exports = { correctionRangeScheduleTests };
