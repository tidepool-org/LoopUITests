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
