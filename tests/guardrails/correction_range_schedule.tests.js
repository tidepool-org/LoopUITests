const { limits } = require('../../src/index');

var correctionRangeScheduleTests = (test) => {
    var screen;
    beforeEach(async () => {
        screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        await screen.OpenPicker();
        await screen.SetTime('12:00 AM');
    });
    afterEach(async () => {
        await screen.Cancel();
    });
    it('can set at max', async () => {
        await screen.Apply({
            min: limits.correctionRange.max.limit,
            max: limits.correctionRange.max.limit,
        });
    });
    it('can set at max warning', async () => {
        await screen.Apply({
            min: limits.correctionRange.max.warning,
            max: limits.correctionRange.max.warning
        });
    });
    it('can set at below max warning', async () => {
        await screen.Apply({
            min: limits.correctionRange.max.noWarning,
            max: limits.correctionRange.max.noWarning
        });
    });
    it('can set above min warning', async () => {
        await screen.Apply({
            min: limits.correctionRange.min.noWarning,
            max: limits.correctionRange.max.limit
        });
    });
    it('can set at min warning', async () => {
        await screen.Apply({
            min: limits.correctionRange.min.warning,
            max: limits.correctionRange.max.limit
        });
    });
    it('can set at min', async () => {
        await screen.Apply({
            min: limits.correctionRange.min.limit,
            max: limits.correctionRange.max.limit
        });
    });
};

module.exports = { correctionRangeScheduleTests };
