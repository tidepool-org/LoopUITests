const { limits } = require('../../src/index');

var correctionRange = (test) => {

    // TODO: once CorrectionRanges uses accessibile pickers we should
    // be able to launch loop once and then reuse the setup

    it('above maximum cannot be set', async () => {
        try {
            await test.settingsScreen.SetCorrectionRanges([{
                time: '12:00 AM',
                min: limits.correctionRange.max.limit,
                max: limits.correctionRange.max.limit + limits.correctionRange.step
            }]);
        } catch (error) {
            //errors as cannot set to 181
        }
    });

    it('maximum can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '12:00 AM',
            min: limits.correctionRange.max.limit - limits.correctionRange.step,
            max: limits.correctionRange.max.limit
        }]);
        //TODO assert on warning
    });
    it('maximum above lower boundary can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '12:30 AM',
            min: limits.correctionRange.max.warning,
            max: limits.correctionRange.max.warning + limits.correctionRange.step
        }]);
        //TODO assert on warning
    });
    it('maximum lower boundary can be set, no warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '1:00 AM',
            min: limits.correctionRange.max.warning - limits.correctionRange.step,
            max: limits.correctionRange.max.warning
        }]);
        //TODO assert NO warning
    });
    it('above minimum upper boundary can be set, no warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '1:30 AM',
            min: limits.correctionRange.min.warning,
            max: limits.correctionRange.max.limit
        }]);
        //TODO assert NO warning
    });
    it('minimum upper boundary can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '2:00 AM',
            min: limits.correctionRange.min.warning - limits.correctionRange.step,
            max: limits.correctionRange.max.limit
        }]);
        //TODO assert on warning
    });
    it('minimum can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '2:30 AM',
            min: limits.correctionRange.min.limit,
            max: limits.correctionRange.max.limit
        }]);
        //TODO assert on warning
    });
    it('below minimum cannot be set', async () => {
        try {
            await test.settingsScreen.SetCorrectionRanges([{
                time: '12:00 AM',
                min: limits.correctionRange.min.limit - limits.correctionRange.step,
                max: limits.correctionRange.max.limit
            }]);
        } catch (error) {
            //errors as cannot set to 59
        }
    });
};

module.exports = { correctionRange };
