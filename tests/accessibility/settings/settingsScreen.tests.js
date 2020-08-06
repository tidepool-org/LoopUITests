module.exports = (test) => {
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    afterAll(async () => {
        await settingsScreen.ScrollToTop();
        await settingsScreen.Close();
    });
    describe('top of screen', () => {
        it('has a done button', async () => {
            await expect(settingsScreen.DoneButton()).toExist();
        });
        it('has a settings header', async () => {
            await expect(settingsScreen.SettingsHeader()).toExist();
        });
        it('has a Closed Loop button', async () => {
            await expect(settingsScreen.ClosedLoopButton()).toExist();
        });
        it('has a pump header', async () => {
            await expect(settingsScreen.PumpHeader()).toExist();
        });
        it('has a CGM header', async () => {
            await expect(settingsScreen.ContinuousGlucoseMonitorHeader()).toExist();
        });
        it('has a Add Pump label', async () => {
            //TODO: this is acting like a button!
            await expect(settingsScreen.AddPumpLabel()).toExist();
        });
        it('has a Add CGM label', async () => {
            //TODO: this is acting like a button!
            await expect(settingsScreen.AddCGMLabel()).toExist();
        });
    });
    describe('bottom of screen', () => {
        beforeAll(async () => {
            await settingsScreen.ScrollToBottom();
        });
        it('has a configuration header', async () => {
            await expect(settingsScreen.ConfigurationHeader()).toExist();
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
        it('has a Issue Report button', async () => {
            await expect(settingsScreen.IssueReportLabel()).toExist();
        });
        it('has a services header', async () => {
            //await settingsScreen.ScrollToBottom();
            await expect(settingsScreen.ServicesHeader()).toExist();
        });
        it('has a support header', async () => {
            //await settingsScreen.ScrollToBottom();
            await expect(settingsScreen.SupportHeader()).toExist();
        });
    });
};
