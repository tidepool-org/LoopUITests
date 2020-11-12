var _testDescription = {
    hasHeader: 'has a header element',
    hasInfoLabel: 'has an information label',
    hasInfoButton: 'has more information button',
    hasPlusButton: "has a '+' button",
    hasBackButton: 'has a back button',
    hasSaveButton: 'has a save button',
    hasEditButton: 'has an edit button',
    closeScreen: 'close the screen without saving',
    openScreen: 'open therapy setting'
};

module.exports = (test, quick) => {
    let settingsScreen;
    describe('Settings', () => {
        beforeAll(async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        // if (!quick) {
        //     it('is in open loop', async () => {
        //         await expect(settingsScreen.LoopSwitchButton).toHaveValue('0');
        //     });
        //     it('close loop is disabled', async () => {
        //         const buttonAttributes = await settingsScreen.LoopSwitchButton.getAttributes();
        //         console.log('enabled? ',buttonAttributes.enabled);
        //     });
        //     it('has configuration header', async () => {
        //         await expect(settingsScreen.ConfigurationHeader).toBeVisible();
        //     });
        //     it('has therapy settings label', async () => {
        //         await expect(settingsScreen.TherapySettingsLabel).toBeVisible();
        //     });
        //     it('add pump button', async () => {
        //         await expect(settingsScreen.Devices.AddPumpButton).toBeVisible();
        //     });
        //     it('add CGM button', async () => {
        //         await expect(settingsScreen.Devices.AddCGMButton).toBeVisible();
        //     });
        //     it('has support label', async () => {
        //         await settingsScreen.SwipeUpUntilVisible(settingsScreen.SupportLabel);
        //         await expect(settingsScreen.SupportLabel).toBeVisible();
        //     });
        //     it('has support header', async () => {
        //         await expect(settingsScreen.SupportHeader).toBeVisible();
        //     });
        //     it('has a Back Button', async () => {
        //         await expect(settingsScreen.BackButton).toBeVisible();
        //     });
        // }
        // it('add pump', async () => {
        //     await settingsScreen.Devices.AddPump();
        // });
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
        //     describe('Settings from bottom', () => {
        //         describe('1 - Insulin Sensitivities', () => {
        //             let insulinSensitivitiesScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinSensitivitiesLabel);
        //                 insulinSensitivitiesScreen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(insulinSensitivitiesScreen.Header).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoLabel, async () => {
        //                     await expect(insulinSensitivitiesScreen.InfoLabel).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoButton, async () => {
        //                     await expect(insulinSensitivitiesScreen.InfoButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasPlusButton, async () => {
        //                     await expect(insulinSensitivitiesScreen.PlusButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasEditButton, async () => {
        //                     await expect(insulinSensitivitiesScreen.EditButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(insulinSensitivitiesScreen.BackButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(insulinSensitivitiesScreen.SaveButton).toBeVisible();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await insulinSensitivitiesScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('2 - Carb Ratio', () => {
        //             let carbRatioScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CarbRatiosLabel);
        //                 carbRatioScreen = await therapySettingsScreen.OpenCarbRatioScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(carbRatioScreen.Header).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoLabel, async () => {
        //                     await expect(carbRatioScreen.InfoLabel).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoButton, async () => {
        //                     await expect(carbRatioScreen.InfoButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasPlusButton, async () => {
        //                     await expect(carbRatioScreen.PlusButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasEditButton, async () => {
        //                     await expect(carbRatioScreen.EditButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(carbRatioScreen.BackButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(carbRatioScreen.SaveButton).toBeVisible();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await carbRatioScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('3 - Insulin Model', () => {
        //             let insulinModelScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.InsulinModelLabel);
        //                 insulinModelScreen = await therapySettingsScreen.OpenInsulinModelScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(insulinModelScreen.Header).toExist();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(insulinModelScreen.BackButton).toExist();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await insulinModelScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('4 - Delivery Limits', () => {
        //             var deliveryLimitsScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.DeliveryLimitsLabel);
        //                 deliveryLimitsScreen = await therapySettingsScreen.OpenDeliveryLimitsScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(deliveryLimitsScreen.Header).toExist();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(deliveryLimitsScreen.BackButton).toExist();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(deliveryLimitsScreen.SaveButton).toExist();
        //                 });
        //                 it('has a max bolus label ', async () => {
        //                     await expect(deliveryLimitsScreen.MaxBolusLabel).toExist();
        //                 });
        //                 it('has a max bolus info ', async () => {
        //                     await expect(deliveryLimitsScreen.MaxBolusInfo).toExist();
        //                 });
        //                 it('has a max basal rate label ', async () => {
        //                     await expect(deliveryLimitsScreen.MaxBasalRateLabel).toExist();
        //                 });
        //                 it('has a max basal rate info ', async () => {
        //                     await expect(deliveryLimitsScreen.MaxBasalRateInfo).toExist();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await deliveryLimitsScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('5 - Basal Rate', () => {
        //             let basalRateScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.BasalRateLabel);
        //                 basalRateScreen = await therapySettingsScreen.OpenBasalRateScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(basalRateScreen.Header).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoLabel, async () => {
        //                     await expect(basalRateScreen.InfoLabel).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoButton, async () => {
        //                     await expect(basalRateScreen.InfoButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasPlusButton, async () => {
        //                     await expect(basalRateScreen.PlusButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasEditButton, async () => {
        //                     await expect(basalRateScreen.EditButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(basalRateScreen.BackButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(basalRateScreen.SaveButton).toBeVisible();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await basalRateScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('6 - Correction Range', () => {
        //             let correctionRangeScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.CorrectionRangeLabel);
        //                 correctionRangeScreen = await therapySettingsScreen.OpenCorrectionRangeScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(correctionRangeScreen.Header).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoLabel, async () => {
        //                     await expect(correctionRangeScreen.InfoLabel).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoButton, async () => {
        //                     await expect(correctionRangeScreen.InfoButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasPlusButton, async () => {
        //                     await expect(correctionRangeScreen.PlusButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasEditButton, async () => {
        //                     await expect(correctionRangeScreen.EditButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(correctionRangeScreen.BackButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(correctionRangeScreen.SaveButton).toBeVisible();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await correctionRangeScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //         describe('7 - Suspend Threshold', () => {
        //             let suspendThresholdScreen;
        //             it(_testDescription.openScreen, async () => {
        //                 therapySettingsScreen = await settingsScreen.OpenTherapySettings();
        //                 await therapySettingsScreen.SwipeUpUntilVisible(therapySettingsScreen.SuspendThresholdLabel);
        //                 suspendThresholdScreen = await therapySettingsScreen.OpenSuspendThresholdScreen();
        //             });
        //             if (!quick) {
        //                 it(_testDescription.hasHeader, async () => {
        //                     await expect(suspendThresholdScreen.Header).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoLabel, async () => {
        //                     await expect(suspendThresholdScreen.InfoLabel).toBeVisible();
        //                 });
        //                 it(_testDescription.hasInfoButton, async () => {
        //                     await expect(suspendThresholdScreen.InfoButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasBackButton, async () => {
        //                     await expect(suspendThresholdScreen.BackButton).toBeVisible();
        //                 });
        //                 it(_testDescription.hasSaveButton, async () => {
        //                     await expect(suspendThresholdScreen.SaveButton).toBeVisible();
        //                 });
        //             }
        //             it(_testDescription.closeScreen, async () => {
        //                 await suspendThresholdScreen.BackButton.tap();
        //                 await therapySettingsScreen.BackButton.tap();
        //             });
        //         });
        //     });
        });
    });
};
