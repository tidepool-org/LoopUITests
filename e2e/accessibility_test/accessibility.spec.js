const { setup, screen } = require('../../src/index');

describe('accessibility', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('home', () => {
        it('has a Active Carbohydrates Label', async () => {
            await expect(screen.home.ActiveCarbohydratesLabel()).toExist();
        });
        it('has a Active Insulin Label', async () => {
            await expect(screen.home.ActiveInsulinLabel()).toExist();
        });
        it('has a Insulin Delivery Label', async () => {
            await expect(screen.home.InsulinDeliveryLabel()).toExist();
        });
        it('has a Glucose Label', async () => {
            await expect(screen.home.GlucoseLabel()).toExist();
        });
        it('has a Settings Button', async () => {
            await expect(screen.home.SettingsButton()).toExist();
        });
        it('has a Overrides Button', async () => {
            await expect(screen.home.OverridesButton()).toExist();
        });
        it('has a Add Meal Button', async () => {
            await expect(screen.home.AddMealButton()).toExist();
        });
        it('has a Bolus Button', async () => {
            await expect(screen.home.BolusButton()).toExist();
        });
    });
    describe('bolus', () => {
        beforeAll(async () => {
            await screen.bolus.Open();
        });
        afterAll(async () => {
            await screen.bolus.Cancel();
        });
        it('has a Bolus Header', async () => {
            await expect(screen.bolus.BolusHeader()).toExist();
        });
        it('has a Deliver Button', async () => {
            await expect(screen.bolus.DeliverButton()).toExist();
        });
        it('has a Disabled Deliver Button', async () => {
            await expect(screen.bolus.DisabledDeliverButton()).toExist();
        });
        it('has a Recommended Label', async () => {
            await expect(screen.bolus.RecommendedLabel()).toExist();
        });
        it('has a Entered Label', async () => {
            await expect(screen.bolus.EnteredLabel()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(screen.bolus.CancelHeaderButton()).toExist();
        });
    });
    describe('add meal', () => {
        beforeAll(async () => {
            await screen.carbEntry.Open();
        });
        afterAll(async () => {
            await screen.carbEntry.Cancel();
        });
        it('has a Add Carb Entry Header', async () => {
            await expect(screen.carbEntry.AddCarbEntryHeader()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(screen.carbEntry.CancelHeaderButton()).toExist();
        });
        it('has a Disabled Continue Main Button', async () => {
            await expect(screen.carbEntry.DisabledContinueMainButton()).toExist();
        });
        it('has a Disabled Continue Header Button', async () => {
            await expect(screen.carbEntry.DisabledContinueHeaderButton()).toExist();
        });
        it('has a Absorption Time Message', async () => {
            await expect(screen.carbEntry.AbsorptionTimeMessage()).toExist();
        });
        it('has a Absorption Time Label', async () => {
            await expect(screen.carbEntry.AbsorptionTimeLabel()).toExist();
        });
        it('has a Date Label', async () => {
            await expect(screen.carbEntry.DateLabel()).toExist();
        });
        it('has a Amount Consumed Label', async () => {
            await expect(screen.carbEntry.AmountConsumedLabel()).toExist();
        });
        it('has a Food Type Label', async () => {
            await expect(screen.carbEntry.FoodTypeLabel()).toExist();
        });
    });
    describe('override', () => {
        beforeAll(async () => {
            await screen.overrides.Open();
        });
        afterAll(async () => {
            await screen.overrides.Cancel();
        });
        it('has a Custom Preset Header', async () => {
            await expect(screen.overrides.CustomPresetHeader()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(screen.overrides.CancelHeaderButton()).toExist();
        });
        it('has a Edit Header Button', async () => {
            await expect(screen.overrides.EditHeaderButton()).toExist();
        });
        it('has a Add Header Button', async () => {
            await expect(screen.overrides.AddHeaderButton()).toExist();
        });
        it('has a Add Preset Message', async () => {
            await expect(screen.overrides.AddPresetMessage()).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await screen.settings.Open();
        });
        afterAll(async () => {
            await screen.settings.Close();
        });
        it('has a done button', async () => {
            await expect(screen.settings.DoneButton()).toExist();
        });
        it('has a configuration header', async () => {
            await expect(screen.settings.ConfigurationHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(screen.settings.PumpHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(screen.settings.ContinuousGlucoseMonitorHeader()).toExist();
        });
        it('has a settings header', async () => {
            await expect(screen.settings.SettingsHeader()).toExist();
        });
        it('has a Issue Report Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.IssueReportLabel()).toExist();
        });
        it('has a Correction Range Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.CorrectionRangeLabel()).toExist();
        });
        it('has a Suspend Threshold label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.SuspendThresholdLabel()).toExist();
        });
        it('has a Basal Rates Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.BasalRatesLabel()).toExist();
        });
        it('has a Delivery Limits Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.DeliveryLimitsLabel()).toExist();
        });
        it('has a Insulin Model Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.InsulinModelLabel()).toExist();
        });
        it('has a Carb Ratios Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.CarbRatiosLabel()).toExist();
        });
        it('has a Insulin Sensitivities Label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.InsulinSensitivitiesLabel()).toExist();
        });
        it('has a Closed Loop button', async () => {
            await expect(screen.settings.ClosedLoopButton()).toExist();
        });
        it('has a Issue Report button', async () => {
            await expect(screen.settings.IssueReportLabel()).toExist();
        });
        it('has a Add Pump label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.AddPumpLabel()).toExist();
        });
        it('has a Add CGM label', async () => {
            //TODO: this is acting like a button!
            await expect(screen.settings.AddCGMLabel()).toExist();
        });
        it('has a services header', async () => {
            await screen.settings.ScrollToBottom();
            await expect(screen.settings.ServicesHeader()).toExist();
        });
    });
});
