module.exports = (test, quick) => {
    let settingsScreen;
    describe('Settings', () => {
        beforeAll(async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        if (!quick) {
            it('open loop', async () => {
                await expect(settingsScreen.LoopSwitchButton).toHaveValue('0');
            });
            it('close loop', async () => {
                await settingsScreen.ClosedLoop();
                await expect(settingsScreen.LoopSwitchButton).toHaveValue('1');
            });
            it('has configuration header', async () => {
                await expect(settingsScreen.ConfigurationHeader).toBeVisible();
            });
            it('has therapy settings label', async () => {
                await expect(settingsScreen.TherapySettingsLabel).toBeVisible();
            });
            it('add pump button', async () => {
                await expect(settingsScreen.Devices.AddPumpButton()).toBeVisible();
            });
            it('add CGM button', async () => {
                await expect(settingsScreen.Devices.AddCGMButton()).toBeVisible();
            });
            it('has support label', async () => {
                await settingsScreen.SwipeUpUntilVisible(settingsScreen.SupportLabel);
                await expect(settingsScreen.SupportLabel).toBeVisible();
            });
            it('has support header', async () => {
                await expect(settingsScreen.SupportHeader).toBeVisible();
            });
            it('has a Back Button', async () => {
                await expect(settingsScreen.BackButton).toBeVisible();
            });
        }
        it('add pump', async () => {
            await settingsScreen.Devices.AddPump();
        });
        describe('Therapy Settings', () => {
            let therapySettingsScreen;
            it('open therapy settings', async () => {
                therapySettingsScreen = await settingsScreen.OpenTherapySettings();
            });
            if (!quick) {
                it('has suspend thresold label', async () => {
                    await expect(therapySettingsScreen.SuspendThresholdLabel).toBeVisible();
                });
                it('has suspend thresold info', async () => {
                    await expect(therapySettingsScreen.SuspendThresholdInfo).toBeVisible();
                });
                it('has correction range label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CorrectionRangeLabel);
                    await expect(therapySettingsScreen.CorrectionRangeLabel).toBeVisible();
                });
                it('has correction range info', async () => {
                    await expect(therapySettingsScreen.CorrectionRangeInfo).toBeVisible();
                });
                it('has pre-meal range label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.PreMealRangeLabel);
                    await expect(therapySettingsScreen.PreMealRangeLabel).toBeVisible();
                });
                it('has pre-meal range info', async () => {
                    await expect(therapySettingsScreen.PreMealRangeInfo).toBeVisible();
                });
                it('has workout range label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.WorkoutRangeLabel);
                    await expect(therapySettingsScreen.WorkoutRangeLabel).toBeVisible();
                });
                it('has workout range info', async () => {
                    await expect(therapySettingsScreen.WorkoutRangeInfo).toBeVisible();
                });
                it('has basal rate label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.BasalRateLabel);
                    await expect(therapySettingsScreen.BasalRateLabel).toBeVisible();
                });
                it('has basal rate info', async () => {
                    await expect(therapySettingsScreen.BasalRateInfo).toBeVisible();
                });
                it('has delivery limits label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.DeliveryLimitsMaxBolusLabel);
                    await expect(therapySettingsScreen.DeliveryLimitsLabel).toBeVisible();
                });
                it('has delivery limits info', async () => {
                    await expect(therapySettingsScreen.DeliveryLimitsInfo).toBeVisible();
                });
                it('has delivery limits max basal rate', async () => {
                    await expect(therapySettingsScreen.DeliveryLimitsMaxBasalRateLabel).toBeVisible();
                });
                it('has delivery limits max bolus', async () => {
                    await expect(therapySettingsScreen.DeliveryLimitsMaxBolusLabel).toBeVisible();
                });
                it('has insulin model label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinModelLabel);
                    await expect(therapySettingsScreen.InsulinModelLabel).toBeVisible();
                });
                it('has insulin model info', async () => {
                    await expect(therapySettingsScreen.InsulinModelInfo).toBeVisible();
                });
                it('has carb ratios label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CarbRatiosLabel);
                    await expect(therapySettingsScreen.CarbRatiosLabel).toBeVisible();
                });
                it('has carb ratios info', async () => {
                    await expect(therapySettingsScreen.CarbRatiosInfo).toBeVisible();
                });
                it('has insulin sensitivities label', async () => {
                    await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinSensitivitiesLabel);
                    await expect(therapySettingsScreen.InsulinSensitivitiesLabel).toBeVisible();
                });
                it('has insulin sensitivities info', async () => {
                    await expect(therapySettingsScreen.InsulinSensitivitiesInfo).toBeVisible();
                });
            }
            it('has a Back Button', async () => {
                await therapySettingsScreen.BackButton.tap();
            });
            describe('Settings from bottom', () => {
                describe('1 - Insulin Sensitivities', () => {
                    let insulinSensitivitiesScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinSensitivitiesLabel);
                        insulinSensitivitiesScreen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(insulinSensitivitiesScreen.Header).toBeVisible();
                        });
                        it('has an info label', async () => {
                            await expect(insulinSensitivitiesScreen.InfoLabel).toBeVisible();
                        });
                        it('has an info button', async () => {
                            await expect(insulinSensitivitiesScreen.InfoButton).toBeVisible();
                        });
                        it('has a + button', async () => {
                            await expect(insulinSensitivitiesScreen.PlusButton).toBeVisible();
                        });
                        it('has a edit button', async () => {
                            await expect(insulinSensitivitiesScreen.EditButton).toBeVisible();
                        });
                        it('has a back button', async () => {
                            await expect(insulinSensitivitiesScreen.BackButton).toBeVisible();
                        });
                        it('has a save button', async () => {
                            await expect(insulinSensitivitiesScreen.SaveButton).toBeVisible();
                        });
                    }
                    it('cancel and close', async () => {
                        await insulinSensitivitiesScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('2 - Carb Ratio', () => {
                    let carbRatioScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CarbRatiosLabel);
                        carbRatioScreen = await therapySettingsScreen.OpenCarbRatioScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(carbRatioScreen.Header).toBeVisible();
                        });
                        it('has an info label', async () => {
                            await expect(carbRatioScreen.InfoLabel).toBeVisible();
                        });
                        it('has an info button', async () => {
                            await expect(carbRatioScreen.InfoButton).toBeVisible();
                        });
                        it('has a + button', async () => {
                            await expect(carbRatioScreen.PlusButton).toBeVisible();
                        });
                        it('has a edit button', async () => {
                            await expect(carbRatioScreen.EditButton).toBeVisible();
                        });
                        it('has a cancel button', async () => {
                            await expect(carbRatioScreen.BackButton).toBeVisible();
                        });
                        it('has a save button', async () => {
                            await expect(carbRatioScreen.SaveButton).toBeVisible();
                        });
                    }
                    it('cancel and close', async () => {
                        await carbRatioScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('3 - Insulin Model', () => {
                    let insulinModelScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinModelLabel);
                        insulinModelScreen = await therapySettingsScreen.OpenInsulinModelScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(insulinModelScreen.Header).toExist();
                        });
                        it('has a back button', async () => {
                            await expect(insulinModelScreen.BackButton).toExist();
                        });
                    }
                    it('close', async () => {
                        await insulinModelScreen.BackButton.tap();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('4 - Delivery Limits', () => {
                    var deliveryLimitsScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.DeliveryLimitsLabel);
                        deliveryLimitsScreen = await therapySettingsScreen.OpenDeliveryLimitsScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(deliveryLimitsScreen.Header).toExist();
                        });
                        it('has a cancel button', async () => {
                            await expect(deliveryLimitsScreen.BackButton).toExist();
                        });
                        it('has a save button', async () => {
                            await expect(deliveryLimitsScreen.SaveButton).toExist();
                        });
                        it('has a max bolus label ', async () => {
                            await expect(deliveryLimitsScreen.MaxBolusLabel).toExist();
                        });
                        it('has a max bolus info ', async () => {
                            await expect(deliveryLimitsScreen.MaxBolusInfo).toExist();
                        });
                        it('has a max basal rate label ', async () => {
                            await expect(deliveryLimitsScreen.MaxBasalRateLabel).toExist();
                        });
                        it('has a max basal rate info ', async () => {
                            await expect(deliveryLimitsScreen.MaxBasalRateInfo).toExist();
                        });
                    }
                    it('cancel and close', async () => {
                        await deliveryLimitsScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('5 - Basal Rate', () => {
                    let basalRateScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.BasalRateLabel);
                        basalRateScreen = await therapySettingsScreen.OpenBasalRateScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(basalRateScreen.Header).toBeVisible();
                        });
                        it('has an info label', async () => {
                            await expect(basalRateScreen.InfoLabel).toBeVisible();
                        });
                        it('has an info button', async () => {
                            await expect(basalRateScreen.InfoButton).toBeVisible();
                        });
                        it('has a + button', async () => {
                            await expect(basalRateScreen.PlusButton).toBeVisible();
                        });
                        it('has a edit button', async () => {
                            await expect(basalRateScreen.EditButton).toBeVisible();
                        });
                        it('has a cancel button', async () => {
                            await expect(basalRateScreen.BackButton).toBeVisible();
                        });
                        it('has a save button', async () => {
                            await expect(basalRateScreen.SaveButton).toBeVisible();
                        });
                    }
                    it('cancel and close', async () => {
                        await basalRateScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('6 - Correction Range', () => {
                    let correctionRangeScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CorrectionRangeLabel);
                        correctionRangeScreen = await therapySettingsScreen.OpenCorrectionRangeScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(correctionRangeScreen.Header).toBeVisible();
                        });
                        it('has an info label', async () => {
                            await expect(correctionRangeScreen.InfoLabel).toBeVisible();
                        });
                        it('has an info button', async () => {
                            await expect(correctionRangeScreen.InfoButton).toBeVisible();
                        });
                        it('has a + button', async () => {
                            await expect(correctionRangeScreen.PlusButton).toBeVisible();
                        });
                        it('has a edit button', async () => {
                            await expect(correctionRangeScreen.EditButton).toBeVisible();
                        });
                        it('has a back button', async () => {
                            await expect(correctionRangeScreen.BackButton).toBeVisible();
                        });
                        it('has a save button', async () => {
                            await expect(correctionRangeScreen.SaveButton).toBeVisible();
                        });
                    }
                    it('clean up and close', async () => {
                        await correctionRangeScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
                describe('7 - Suspend Threshold', () => {
                    let suspendThresholdScreen;
                    it('open', async () => {
                        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
                        await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.SuspendThresholdLabel);
                        suspendThresholdScreen = await therapySettingsScreen.OpenSuspendThresholdScreen();
                    });
                    if (!quick) {
                        it('has a header', async () => {
                            await expect(suspendThresholdScreen.Header).toBeVisible();
                        });
                        it('has an info label', async () => {
                            await expect(suspendThresholdScreen.InfoLabel).toBeVisible();
                        });
                        it('has an info button', async () => {
                            await expect(suspendThresholdScreen.InfoButton).toBeVisible();
                        });
                        it('has a back button', async () => {
                            await expect(suspendThresholdScreen.BackButton).toBeVisible();
                        });
                        it('has a save button', async () => {
                            await expect(suspendThresholdScreen.SaveButton).toBeVisible();
                        });
                    }
                    it('clean up and close', async () => {
                        await suspendThresholdScreen.CancelAndClose();
                        await therapySettingsScreen.BackButton.tap();
                    });
                });
            });
        });
    });
};
