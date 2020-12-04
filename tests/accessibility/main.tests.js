module.exports = (test) => {
    describe('Status Screen', () => {
        var statusScreen;
        it('has a Active Carbohydrates Label', async () => {
            statusScreen = await test.OpenStatusScreen();
        });
        it('has a Active Carbohydrates Label', async () => {
            await expect(statusScreen.ActiveCarbohydratesLabel).toBeVisible();
        });
        it('has a Active Insulin Label', async () => {
            await expect(statusScreen.ActiveInsulinLabel).toBeVisible();
        });
        it('has a Insulin Delivery Label', async () => {
            await expect(statusScreen.InsulinDeliveryLabel).toBeVisible();
        });
        it('has a Glucose Label', async () => {
            await expect(statusScreen.GlucoseLabel).toBeVisible();
        });
        it('has a Settings Button', async () => {
            await expect(statusScreen.SettingsButton).toBeVisible();
        });
        it('has a Add Meal Button', async () => {
            await expect(statusScreen.AddMealButton).toBeVisible();
        });
        it('has a Bolus Button', async () => {
            await expect(statusScreen.BolusButton).toBeVisible();
        });
        describe('HUD', () => {
            it('add pump button', async () => {
                await expect(statusScreen.HeaderSection.Devices.AddPumpButton()).toBeVisible();
            });
            it('add CGM button', async () => {
                await expect(statusScreen.HeaderSection.Devices.AddCGMButton()).toBeVisible();
            });
            it('Loop button', async () => {
                await expect(statusScreen.HeaderSection.LoopIcon).toBeVisible();
            });
            it('Tap to add blood glucose button', async () => {
                await expect(statusScreen.HeaderSection.EnterBloodGlucoseButton).toBeVisible();
            });
            it('No recent blood glucose label', async () => {
                await expect(statusScreen.HeaderSection.NoRecentBloodGlucoseLabel).toBeVisible();
            });
        });
    });
    describe('Insulin Delivery Chart', () => {
        var insulinDeliveryChart;
        beforeAll(async () => {
            let statusScreen = await test.OpenStatusScreen();
            insulinDeliveryChart = await statusScreen.OpenInsulinDeliveryChart();
        });
        it('has a header', async () => {
            await expect(insulinDeliveryChart.Header).toBeVisible();
        });
        it('has a IOB Label', async () => {
            await expect(insulinDeliveryChart.IOBLabel).toBeVisible();
        });
        it('has a Total Label', async () => {
            await expect(insulinDeliveryChart.TotalLabel).toBeVisible();
        });
        it('has an Event History Label', async () => {
            await expect(insulinDeliveryChart.EventHistoryLabel).toBeVisible();
        });
        it('has a Reservoir Label', async () => {
            await expect(insulinDeliveryChart.ReservoirLabel).toBeVisible();
        });
        it('has a Back Button', async () => {
            await insulinDeliveryChart.BackButton.tap();
        });
    });
    describe('Active Carbohydrates Chart', () => {
        let activeCarbohydratesChart;
        beforeAll(async () => {
            let statusScreen = await test.OpenStatusScreen();
            activeCarbohydratesChart = await statusScreen.OpenActiveCarbohydratesChart();
        });
        it('has a header', async () => {
            await expect(activeCarbohydratesChart.Header).toBeVisible();
        });
        it('has a Grams Active Carbs Label', async () => {
            await expect(activeCarbohydratesChart.GramsActiveCarbsLabel).toBeVisible();
        });
        it('has a Grams Total Carbs Label', async () => {
            await expect(activeCarbohydratesChart.GramsTotalCarbsLabel).toBeVisible();
        });
        it('has an Glucose Change Label', async () => {
            await expect(activeCarbohydratesChart.GlucoseChangeLabel).toBeVisible();
        });
        it('has a Observed Label', async () => {
            await expect(activeCarbohydratesChart.ObservedLabel).toBeVisible();
        });
        it('has a Predicted Label', async () => {
            await expect(activeCarbohydratesChart.PredictedLabel).toBeVisible();
        });
        it('has a Back Button', async () => {
            await activeCarbohydratesChart.BackButton.tap();
        });
    });
    describe('Active Insulin Chart', () => {
        let activeInsulinChart;
        beforeAll(async () => {
            let statusScreen = await test.OpenStatusScreen();
            activeInsulinChart = await statusScreen.OpenActiveInsulinChart();
        });
        it('has a header', async () => {
            await expect(activeInsulinChart.Header).toBeVisible();
        });
        it('has a IOB Label', async () => {
            await expect(activeInsulinChart.IOBLabel).toBeVisible();
        });
        it('has a Total Label', async () => {
            await expect(activeInsulinChart.TotalLabel).toBeVisible();
        });
        it('has an Event History Label', async () => {
            await expect(activeInsulinChart.EventHistoryLabel).toBeVisible();
        });
        it('has a Reservoir Label', async () => {
            await expect(activeInsulinChart.ReservoirLabel).toBeVisible();
        });
        it('has a Back Button', async () => {
            await activeInsulinChart.BackButton.tap();
        });
    });
    describe('Glucose Chart', () => {
        let glucoseChart;
        beforeAll(async () => {
            let statusScreen = await test.OpenStatusScreen();
            glucoseChart = await statusScreen.OpenGlucoseChart();
        });
        it('has a header', async () => {
            await expect(glucoseChart.Header).toBeVisible();
        });
        it('has a Carbohydrates Label', async () => {
            await expect(glucoseChart.CarbohydratesLabel).toBeVisible();
        });
        it('has a Insulin Label', async () => {
            await expect(glucoseChart.InsulinLabel).toBeVisible();
        });
        it('has a Glucose Momentum Label', async () => {
            await expect(glucoseChart.GlucoseMomentumLabel).toBeVisible();
        });
        it('has a Retrospective Correction Label', async () => {
            await expect(glucoseChart.RetrospectiveCorrectionLabel).toBeVisible();
        });
        it('has a Back Button', async () => {
            await glucoseChart.BackButton.tap();
        });
    });
    describe('Bolus Screen', () => {
        let bolusScreen;
        it('has to open the bolus screen', async () => {
            bolusScreen = await test.OpenBolusScreen();
        });
        it('has a Header', async () => {
            await expect(bolusScreen.Header).toBeVisible();
        });
        it('has a Cancel Header Button', async () => {
            await expect(bolusScreen.BackButton).toBeVisible();
        });
        it('has a Enter Bolus Button', async () => {
            await expect(bolusScreen.EnterBolusButton).toBeVisible();
        });
        it('has a Recommended Bolus Label', async () => {
            await expect(bolusScreen.RecommendedBolusLabel).toBeVisible();
        });
        it('has a Recommended Bolus Units Label', async () => {
            await expect(bolusScreen.RecommendedBolusUnits).toBeVisible();
        });
        it('has a Bolus Label', async () => {
            await expect(bolusScreen.BolusLabel).toBeVisible();
        });
        it('has a Bolus Units Label', async () => {
            await expect(bolusScreen.BolusUnits).toBeVisible();
        });
        it('has a Bolus Summary Header', async () => {
            await expect(bolusScreen.BolusSummaryHeader).toBeVisible();
        });
        it('has a Glucose Header', async () => {
            await expect(bolusScreen.GlucoseHeader).toBeVisible();
        });
        it('can cancel and then close the bolus screen', async () => {
            await bolusScreen.BackButton.tap();
        });
    });
    describe('Carb Entry Screen', () => {
        let carbEntryScreen;
        it('has to open the Carb Entry screen', async () => {
            carbEntryScreen = await test.OpenCarbEntryScreen();
        });
        it('has a Add Carb Entry Header', async () => {
            await expect(carbEntryScreen.Header).toBeVisible();
        });
        it('has a Cancel Button', async () => {
            await expect(carbEntryScreen.BackButton).toBeVisible();
        });
        it('has a Disabled Continue Main Button', async () => {
            await expect(carbEntryScreen.ContinueMainButton).toBeVisible();
        });
        it('has a Absorption Time Message', async () => {
            await expect(carbEntryScreen.AbsorptionTimeMessage).toBeVisible();
        });
        it('has a Absorption Time Label', async () => {
            await expect(carbEntryScreen.AbsorptionTimeLabel).toBeVisible();
        });
        it('has a Time Label', async () => {
            await expect(carbEntryScreen.TimeLabel).toBeVisible();
        });
        it('has a Amount Consumed Label', async () => {
            await expect(carbEntryScreen.AmountConsumedLabel).toBeVisible();
        });
        it('has a Food Type Label', async () => {
            await expect(carbEntryScreen.FoodTypeLabel).toBeVisible();
        });
        describe('meal bolus', () => {
            var mealBolusScreen;
            it('add carbs', async () => {
                await carbEntryScreen.SetCarbs(10);
            });
            it('open on continue', async () => {
                mealBolusScreen = await carbEntryScreen.ContinueToBolus();
            });
            it('has a Header', async () => {
                await expect(mealBolusScreen.Header).toBeVisible();
            });
            it('has a Save without Bolus Button', async () => {
                await expect(mealBolusScreen.SaveWithoutBolusButton).toBeVisible();
            });
            it('has a Recommended Bolus Label', async () => {
                await expect(mealBolusScreen.RecommendedBolusLabel).toBeVisible();
            });
            it('has a Recommended Bolus Units Label', async () => {
                await expect(mealBolusScreen.RecommendedBolusUnits).toBeVisible();
            });
            it('has a Bolus Label', async () => {
                await expect(mealBolusScreen.BolusLabel).toBeVisible();
            });
            it('has a Bolus Units Label', async () => {
                await expect(mealBolusScreen.BolusUnits).toBeVisible();
            });
            it('has a Bolus Summary Header', async () => {
                await expect(mealBolusScreen.BolusSummaryHeader).toBeVisible();
            });
            it('has a Glucose Header', async () => {
                await expect(mealBolusScreen.GlucoseHeader).toBeVisible();
            });
            it('can go back', async () => {
                await mealBolusScreen.BackButton.tap();
            });
        });
        it('has to close the Carb Entry screen', async () => {
            await carbEntryScreen.BackButton.tap();
        });
    });
};
