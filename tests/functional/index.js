module.exports = (test) => {
    describe('home', () => {
        it('can check loop status', async () => {
            var homeScreen = await test.OpenHomeScreen();
            await homeScreen.HeaderSection().Loop();
        });
    });
    describe('bolus', () => {
        it('can deliver bolus', async () => {
            await test.LoopUtilities.deliverBolus(0.5);
        });
    });
    describe('settings', () => {
        var settingsScreen;
        it('can open', async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        describe('threapy settings', () => {
            var therapySettingsScreen;
            it('can open', async () => {
                therapySettingsScreen = await settingsScreen.OpenTherapySettings();
            });
            describe('correction range', () => {
                var correctionRangeScreen;
                var correctionRangeScreenLimits;
                it('open ', async () => {
                    correctionRangeScreen = await therapySettingsScreen.OpenCorrectionRangeScreen();
                    correctionRangeScreenLimits = test.limits.correctionRange;
                });
                it('can change the time ', async () => {
                    await correctionRangeScreen.OpenPicker('12:00 AM');
                    //TODO change the time...
                });
                it('can change the min value', async () => {
                    await correctionRangeScreen.ApplyOne({
                        expected: {
                            min: correctionRangeScreenLimits.min.limit,
                            max: 110,
                        },
                        current: {
                            min: 100,
                            max: 110,
                        }
                    });
                });
                it('can change the max value', async () => {
                    await correctionRangeScreen.ApplyOne({
                        expected: {
                            min: correctionRangeScreenLimits.min.limit,
                            max: correctionRangeScreenLimits.max.noWarning,
                        },
                        current: {
                            min: correctionRangeScreenLimits.min.limit,
                            max: 110,
                        }
                    });
                });
                it('can save and authenticate', async () => {
                    await correctionRangeScreen.SaveAndClose();
                    await correctionRangeScreen.Authenticate();
                });
            });
            it('can close', async () => {
                await therapySettingsScreen.ReturnToHomeScreen();
            });
        });
    });
    describe('carb entry', () => {
        it('set to open loop', async () => {
            await test.LoopUtilities.openLoop();
        });
        it('can add carbs', async () => {
            await test.LoopUtilities.addCarbohydrates(5);
        });
    });
};
