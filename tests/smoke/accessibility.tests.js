
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
    var bolusScreen;
    it('has to open the bolus screen', async () => {
        bolusScreen = await test.OpenBolusScreen();
    });
    it('has a Bolus Header', async () => {
        await expect(bolusScreen.BolusHeader()).toExist();
    });
    it('has a Deliver Button', async () => {
        await expect(bolusScreen.DeliverButton()).toExist();
    });
    it('has a Disabled Deliver Button', async () => {
        await expect(bolusScreen.DisabledDeliverButton()).toExist();
    });
    it('has a Recommended Label', async () => {
        await expect(bolusScreen.RecommendedLabel()).toExist();
    });
    it('has a Entered Label', async () => {
        await expect(bolusScreen.EnteredLabel()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(bolusScreen.CancelHeaderButton()).toExist();
    });
    it('has to close the bolus screen', async () => {
        await bolusScreen.Cancel();
    });
};

var carbEntryScreenAccessibilityTests = (test) => {
    var carbEntryScreen;
    it('has to open the Carb Entry screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it('has a Add Carb Entry Header', async () => {
        await expect(carbEntryScreen.AddCarbEntryHeader()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(carbEntryScreen.CancelHeaderButton()).toExist();
    });
    it('has a Disabled Continue Main Button', async () => {
        await expect(carbEntryScreen.DisabledContinueMainButton()).toExist();
    });
    it('has a Disabled Continue Header Button', async () => {
        await expect(carbEntryScreen.DisabledContinueHeaderButton()).toExist();
    });
    it('has a Absorption Time Message', async () => {
        await expect(carbEntryScreen.AbsorptionTimeMessage()).toExist();
    });
    it('has a Absorption Time Label', async () => {
        await expect(carbEntryScreen.AbsorptionTimeLabel()).toExist();
    });
    it('has a Date Label', async () => {
        await expect(carbEntryScreen.DateLabel()).toExist();
    });
    it('has a Amount Consumed Label', async () => {
        await expect(carbEntryScreen.AmountConsumedLabel()).toExist();
    });
    it('has a Food Type Label', async () => {
        await expect(carbEntryScreen.FoodTypeLabel()).toExist();
    });
    it('has to close the Carb Entry screen', async () => {
        await carbEntryScreen.Cancel();
    });
};

var settingsScreenAccessibilityTests = (test) => {
    var settingsScreen;
    it('has to open the settings screen', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('has a done button', async () => {
        await expect(settingsScreen.DoneButton()).toExist();
    });
    it('has a configuration header', async () => {
        await expect(settingsScreen.ConfigurationHeader()).toExist();
    });
    it('has a pump header', async () => {
        await expect(settingsScreen.PumpHeader()).toExist();
    });
    it('has a pump header', async () => {
        await expect(settingsScreen.ContinuousGlucoseMonitorHeader()).toExist();
    });
    it('has a settings header', async () => {
        await expect(settingsScreen.SettingsHeader()).toExist();
    });
    it('has a Issue Report Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.IssueReportLabel()).toExist();
    });
    it('has a Correction Range Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.CorrectionRangeLabel()).toExist();
    });
    it('has a Suspend Threshold label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.SuspendThresholdLabel()).toExist();
    });
    it('has a Basal Rates Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.BasalRatesLabel()).toExist();
    });
    it('has a Delivery Limits Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.DeliveryLimitsLabel()).toExist();
    });
    it('has a Insulin Model Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.InsulinModelLabel()).toExist();
    });
    it('has a Carb Ratios Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.CarbRatiosLabel()).toExist();
    });
    it('has a Insulin Sensitivities Label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.InsulinSensitivitiesLabel()).toExist();
    });
    it('has a Closed Loop button', async () => {
        await expect(settingsScreen.ClosedLoopButton()).toExist();
    });
    it('has a Issue Report button', async () => {
        await expect(settingsScreen.IssueReportLabel()).toExist();
    });
    it('has a Add Pump label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.AddPumpLabel()).toExist();
    });
    it('has a Add CGM label', async () => {
        //TODO: this is acting like a button!
        await expect(settingsScreen.AddCGMLabel()).toExist();
    });
    it('has a services header', async () => {
        await settingsScreen.ScrollToBottom();
        await expect(settingsScreen.ServicesHeader()).toExist();
    });
    it('has to close the settings screen', async () => {
        await settingsScreen.Close();
    });
};

var settingsCarbRatiosScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenCarbRatiosScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('has a add button', async () => {
        await expect(screen.AddButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

var settingsBasalRatesScreenAccessibilityTests = (test) => {
    var settingsScreen;
    var screen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenBasalRatesScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
    it('has an add button', async () => {
        await expect(screen.AddButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

var settingsDeliveryLimitsScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenDeliveryLimitsScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

var settingsIssueReportScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenIssueReportScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

var settingsInsulinModelScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenInsulinModelScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

var settingsInsulinSensitivitiesScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenInsulinSensitivitiesScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button but not visible', async () => {
        await expect(screen.BackButton()).toBeNotVisible();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
    it('has an add button', async () => {
        await expect(screen.AddButton()).toExist();
    });
    it('has a cancel button', async () => {
        await expect(screen.CancelButton()).toExist();
    });
    it('close', async () => {
        await screen.Cancel();
        await settingsScreen.Close();
    });
};

var settingsCorrectionRangeScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenCorrectionRangeScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
    it('has an add button', async () => {
        await expect(screen.AddButton()).toExist();
    });
    it('has no cancel button when not editing', async () => {
        await expect(screen.CancelButton()).toBeNotVisible();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
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
    settingsCorrectionRangeScreenAccessibilityTests,
    settingsIssueReportScreenAccessibilityTests,
    settingsInsulinModelScreenAccessibilityTests,
};
