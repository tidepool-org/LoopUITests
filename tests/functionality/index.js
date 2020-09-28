module.exports = (test) => {
    describe('home', () => {
        it('can check loop status', async () => {
            var homeScreen = await test.OpenHomeScreen();
            await homeScreen.HeaderSection().Loop();
        });
    });
    describe('bolus', () => {
        it('can deliver bolus', async () => {
            await test.LoopUtilities().deliverBolus(0.2);
        });
    });
    describe('settings', () => {
        var settingsScreen;
        it('can open', async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        it('can set to closed loop', async () => {
            await settingsScreen.ClosedLoop();
        });
        it('can set to open loop', async () => {
            await settingsScreen.OpenLoop();
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
        it('can add carbs and deliver bolus', async () => {
            await test.LoopUtilities().addCarbohydratesAndDeliverBolus(5);
        });
    });
};
