const { loop } = require('../../src/index');

describe('accessibility', () => {
    beforeAll(async () => {
        await loop.app.Launch();
    });
    describe('home', () => {
        it('has a Active Carbohydrates Label', async () => {
            await expect(loop.screen.home.ActiveCarbohydratesLabel()).toExist();
        });
        it('has a Active Insulin Label', async () => {
            await expect(loop.screen.home.ActiveInsulinLabel()).toExist();
        });
        it('has a Insulin Delivery Label', async () => {
            await expect(loop.screen.home.InsulinDeliveryLabel()).toExist();
        });
        it('has a Glucose Label', async () => {
            await expect(loop.screen.home.GlucoseLabel()).toExist();
        });
        it('has a Settings Button', async () => {
            await expect(loop.screen.home.SettingsButton()).toExist();
        });
        it('has a Overrides Button', async () => {
            await expect(loop.screen.home.OverridesButton()).toExist();
        });
        it('has a Add Meal Button', async () => {
            await expect(loop.screen.home.AddMealButton()).toExist();
        });
        it('has a Bolus Button', async () => {
            await expect(loop.screen.home.BolusButton()).toExist();
        });
    });
    describe('bolus', () => {
        beforeAll(async () => {
            await loop.screen.bolus.Open();
        });
        afterAll(async () => {
            await loop.screen.bolus.Cancel();
        });
        it('has a Bolus Header', async () => {
            await expect(loop.screen.bolus.BolusHeader()).toExist();
        });
        it('has a Deliver Button', async () => {
            await expect(loop.screen.bolus.DeliverButton()).toExist();
        });
        it('has a Disabled Deliver Button', async () => {
            await expect(loop.screen.bolus.DisabledDeliverButton()).toExist();
        });
        it('has a Recommended Label', async () => {
            await expect(loop.screen.bolus.RecommendedLabel()).toExist();
        });
        it('has a Entered Label', async () => {
            await expect(loop.screen.bolus.EnteredLabel()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loop.screen.bolus.CancelHeaderButton()).toExist();
        });
    });
    describe('add meal', () => {
        beforeAll(async () => {
            await loop.screen.carbEntry.Open();
        });
        afterAll(async () => {
            await loop.screen.carbEntry.Cancel();
        });
        it('has a Add Carb Entry Header', async () => {
            await expect(loop.screen.carbEntry.AddCarbEntryHeader()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loop.screen.carbEntry.CancelHeaderButton()).toExist();
        });
        it('has a Disabled Continue Main Button', async () => {
            await expect(loop.screen.carbEntry.DisabledContinueMainButton()).toExist();
        });
        it('has a Disabled Continue Header Button', async () => {
            await expect(loop.screen.carbEntry.DisabledContinueHeaderButton()).toExist();
        });
        it('has a Absorption Time Message', async () => {
            await expect(loop.screen.carbEntry.AbsorptionTimeMessage()).toExist();
        });
        it('has a Absorption Time Label', async () => {
            await expect(loop.screen.carbEntry.AbsorptionTimeLabel()).toExist();
        });
        it('has a Date Label', async () => {
            await expect(loop.screen.carbEntry.DateLabel()).toExist();
        });
        it('has a Amount Consumed Label', async () => {
            await expect(loop.screen.carbEntry.AmountConsumedLabel()).toExist();
        });
        it('has a Food Type Label', async () => {
            await expect(loop.screen.carbEntry.FoodTypeLabel()).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loop.screen.settings.Open();
        });
        afterAll(async () => {
            await loop.screen.settings.Close();
        });
        it('has a done button', async () => {
            await expect(loop.screen.settings.DoneButton()).toExist();
        });
        it('has a configuration header', async () => {
            await expect(loop.screen.settings.ConfigurationHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loop.screen.settings.PumpHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loop.screen.settings.ContinuousGlucoseMonitorHeader()).toExist();
        });
        it('has a settings header', async () => {
            await expect(loop.screen.settings.SettingsHeader()).toExist();
        });
        it('has a Issue Report Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.IssueReportLabel()).toExist();
        });
        it('has a Correction Range Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.CorrectionRangeLabel()).toExist();
        });
        it('has a Suspend Threshold label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.SuspendThresholdLabel()).toExist();
        });
        it('has a Basal Rates Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.BasalRatesLabel()).toExist();
        });
        it('has a Delivery Limits Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.DeliveryLimitsLabel()).toExist();
        });
        it('has a Insulin Model Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.InsulinModelLabel()).toExist();
        });
        it('has a Carb Ratios Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.CarbRatiosLabel()).toExist();
        });
        it('has a Insulin Sensitivities Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.InsulinSensitivitiesLabel()).toExist();
        });
        it('has a Closed Loop button', async () => {
            await expect(loop.screen.settings.ClosedLoopButton()).toExist();
        });
        it('has a Issue Report button', async () => {
            await expect(loop.screen.settings.IssueReportLabel()).toExist();
        });
        it('has a Add Pump label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.AddPumpLabel()).toExist();
        });
        it('has a Add CGM label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screen.settings.AddCGMLabel()).toExist();
        });
        it('has a services header', async () => {
            await loop.screen.settings.ScrollToBottom();
            await expect(loop.screen.settings.ServicesHeader()).toExist();
        });
    });
});
