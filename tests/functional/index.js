module.exports = (test) => {
    describe('carb entry', () => {
        it('can add carbs and deliver bolus', async () => {
            await test.LoopUtilities.addCarbohydratesAndDeliverBolus(1);
        });
    });
    describe('bolus', () => {
        it('can be delivered', async () => {
            await test.LoopUtilities.deliverBolus(0.1);
        });
    });
    describe('status', () => {
        it('can check loop status', async () => {
            var homeScreen = await test.OpenHomeScreen();
            await homeScreen.HeaderSection.ExpectClosedLoopGreenAlert();
        });
    });
    describe('settings', () => {
        var settingsScreen;
        it('can open', async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        describe('therapy settings', () => {
            var therapySettingsScreen;
            it('can open', async () => {
                therapySettingsScreen = await settingsScreen.OpenTherapySettings();
            });
            describe('correction range', () => {
                var correctionRangeScreen;
                var correctionRangeScreenLimits;
                it('can open ', async () => {
                    correctionRangeScreen = await therapySettingsScreen.OpenCorrectionRangeScreen();
                    correctionRangeScreenLimits = test.getLimitsForSetting('correctionRange');
                });
                var startMin = 105;
                var startMax = 115;
                var finalMin = startMin-5;
                var finalMax = startMax-5;
                it('can change the time ', async () => {
                    await correctionRangeScreen.OpenPicker('8:00 AM');
                    await correctionRangeScreen.SetPickerTime('8:30 AM');
                });
                it('can change the min value', async () => {
                    await correctionRangeScreen.ApplyOne({
                        expected: {
                            min: finalMin,
                            max: startMax,
                        },
                        current: {
                            min: startMin,
                            max: startMax,
                        }
                    });
                });
                it('can change the max value', async () => {
                    await correctionRangeScreen.ApplyOne({
                        expected: {
                            min: finalMin,
                            max: finalMax,
                        },
                        current: {
                            min: finalMin,
                            max: startMax,
                        }
                    });
                });
                it('can save and authenticate', async () => {
                    await correctionRangeScreen.SaveButton.tap();
                    await correctionRangeScreen.Authenticate();
                });
            });
            it('can close', async () => {
                await therapySettingsScreen.ReturnToHomeScreen();
            });
        });
    });
};
