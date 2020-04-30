
var homeScreenAccessibilityTests = (test) => {
    it('has a Active Carbohydrates Label', async () => {
        await expect(test.homeScreen.ActiveCarbohydratesLabel()).toExist();
    });
    it('has a Active Insulin Label', async () => {
        await expect(test.homeScreen.ActiveInsulinLabel()).toExist();
    });
    it('has a Insulin Delivery Label', async () => {
        await expect(test.homeScreen.InsulinDeliveryLabel()).toExist();
    });
    it('has a Glucose Label', async () => {
        await expect(test.homeScreen.GlucoseLabel()).toExist();
    });
    it('has a Settings Button', async () => {
        await expect(test.homeScreen.SettingsButton()).toExist();
    });
    it('has a Add Meal Button', async () => {
        await expect(test.homeScreen.AddMealButton()).toExist();
    });
    it('has a Bolus Button', async () => {
        await expect(test.homeScreen.BolusButton()).toExist();
    });
};

var bolusScreenAccessibilityTests = (test) => {
    it('has to open the bolus screen', async () => {
        await test.bolusScreen.Open();
    });
    it('has a Bolus Header', async () => {
        await expect(test.bolusScreen.BolusHeader()).toExist();
    });
    it('has a Deliver Button', async () => {
        await expect(test.bolusScreen.DeliverButton()).toExist();
    });
    it('has a Disabled Deliver Button', async () => {
        await expect(test.bolusScreen.DisabledDeliverButton()).toExist();
    });
    it('has a Recommended Label', async () => {
        await expect(test.bolusScreen.RecommendedLabel()).toExist();
    });
    it('has a Entered Label', async () => {
        await expect(test.bolusScreen.EnteredLabel()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(test.bolusScreen.CancelHeaderButton()).toExist();
    });
    it('has to close the bolus screen', async () => {
        await test.bolusScreen.Cancel();
    });
};

var carbEntryScreenAccessibilityTests = (test) => {
    it('has to open the Carb Entry screen', async () => {
        await test.carbEntryScreen.Open();
    });
    it('has a Add Carb Entry Header', async () => {
        await expect(test.carbEntryScreen.AddCarbEntryHeader()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(test.carbEntryScreen.CancelHeaderButton()).toExist();
    });
    it('has a Disabled Continue Main Button', async () => {
        await expect(test.carbEntryScreen.DisabledContinueMainButton()).toExist();
    });
    it('has a Disabled Continue Header Button', async () => {
        await expect(test.carbEntryScreen.DisabledContinueHeaderButton()).toExist();
    });
    it('has a Absorption Time Message', async () => {
        await expect(test.carbEntryScreen.AbsorptionTimeMessage()).toExist();
    });
    it('has a Absorption Time Label', async () => {
        await expect(test.carbEntryScreen.AbsorptionTimeLabel()).toExist();
    });
    it('has a Date Label', async () => {
        await expect(test.carbEntryScreen.DateLabel()).toExist();
    });
    it('has a Amount Consumed Label', async () => {
        await expect(test.carbEntryScreen.AmountConsumedLabel()).toExist();
    });
    it('has a Food Type Label', async () => {
        await expect(test.carbEntryScreen.FoodTypeLabel()).toExist();
    });
    it('has to close the Carb Entry screen', async () => {
        await test.carbEntryScreen.Cancel();
    });
};

var settingsScreenAccessibilityTests = (test) => {
    it('has to open the settings screen', async () => {
        await test.settingsScreen.Open();
    });
    it('has a done button', async () => {
        await expect(test.settingsScreen.DoneButton()).toExist();
    });
    it('has a configuration header', async () => {
        await expect(test.settingsScreen.ConfigurationHeader()).toExist();
    });
    it('has a pump header', async () => {
        await expect(test.settingsScreen.PumpHeader()).toExist();
    });
    it('has a pump header', async () => {
        await expect(test.settingsScreen.ContinuousGlucoseMonitorHeader()).toExist();
    });
    it('has a settings header', async () => {
        await expect(test.settingsScreen.SettingsHeader()).toExist();
    });
    it('has a Issue Report Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.IssueReportLabel()).toExist();
    });
    it('has a Correction Range Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.CorrectionRangeLabel()).toExist();
    });
    it('has a Suspend Threshold label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.SuspendThresholdLabel()).toExist();
    });
    it('has a Basal Rates Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.BasalRatesLabel()).toExist();
    });
    it('has a Delivery Limits Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.DeliveryLimitsLabel()).toExist();
    });
    it('has a Insulin Model Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.InsulinModelLabel()).toExist();
    });
    it('has a Carb Ratios Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.CarbRatiosLabel()).toExist();
    });
    it('has a Insulin Sensitivities Label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.InsulinSensitivitiesLabel()).toExist();
    });
    it('has a Closed Loop button', async () => {
        await expect(test.settingsScreen.ClosedLoopButton()).toExist();
    });
    it('has a Issue Report button', async () => {
        await expect(test.settingsScreen.IssueReportLabel()).toExist();
    });
    it('has a Add Pump label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.AddPumpLabel()).toExist();
    });
    it('has a Add CGM label', async () => {
        //TODO: this is acting like a button!
        await expect(test.settingsScreen.AddCGMLabel()).toExist();
    });
    it('has a services header', async () => {
        await test.settingsScreen.ScrollToBottom();
        await expect(test.settingsScreen.ServicesHeader()).toExist();
    });
    it('has to close the settings screen', async () => {
        await test.settingsScreen.Close();
    });
};

var settingsCarbRatiosScreenAccessibilityTests = (test) => {
    var screen;
    it('open', async () => {
        await test.settingsScreen.Open();
        screen = await test.settingsScreen.OpenCarbRatiosScreen();
    });
    it('has a header', async () => {
        await expect(screen.CarbRatiosHeader()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await test.settingsScreen.Close();
    });
};

var settingsBasalRatesScreenAccessibilityTests = (test) => {
    var screen;
    it('open', async () => {
        await test.settingsScreen.Open();
        screen = await test.settingsScreen.OpenBasalRatesScreen();
    });
    it('has a header', async () => {
        await expect(screen.BasalRatesHeader()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await test.settingsScreen.Close();
    });
};

var settingsDeliveryLimitsScreenAccessibilityTests = (test) => {
    var screen;
    it('open', async () => {
        await test.settingsScreen.Open();
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
    });
    it('has a header', async () => {
        await expect(screen.DeliveryLimitsHeader()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await test.settingsScreen.Close();
    });
};

var settingsInsulinSensitivitiesScreenAccessibilityTests = (test) => {
    var screen;
    it('open', async () => {
        await test.settingsScreen.Open();
        screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
    });
    it('has a header', async () => {
        await expect(screen.InsulinSensitivitiesHeader()).toExist();
    });
    it('close', async () => {
        await screen.Cancel();
        await test.settingsScreen.Close();
    });
};

var settingsCorrectionRangeScreenAccessibilityTests = (test) => {
    var screen;
    it('open', async () => {
        await test.settingsScreen.Open();
        screen = await test.settingsScreen.OpenCorrectionRangeScreen();
    });
    it('has a header', async () => {
        await expect(screen.CorrectionRangeHeader()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await test.settingsScreen.Close();
    });
};


module.exports = {
    homeScreenAccessibilityTests,
    bolusScreenAccessibilityTests,
    carbEntryScreenAccessibilityTests,
    settingsScreenAccessibilityTests,
    settingsCarbRatiosScreenAccessibilityTests,
    settingsBasalRatesScreenAccessibilityTests,
    settingsDeliveryLimitsScreenAccessibilityTests,
    settingsInsulinSensitivitiesScreenAccessibilityTests,
    settingsCorrectionRangeScreenAccessibilityTests
};
