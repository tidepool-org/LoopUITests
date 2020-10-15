module.exports = (test, cmgData) => {
    describe('signal loss', () => {
        let cgmScreen;
        let statusScreen;
        beforeAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ model: { name: cgmScreen.screenText.Model.SignalLoss } });
        });
        afterAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply(cmgData);
            await cgmScreen.BackButton.tap();
        });
        it('dimiss signal loss alert', async () => {
            await cgmScreen.DismissAlert(cgmScreen.generalText.Dismiss);
            await cgmScreen.BackButton.tap();
        });
        it('and check error shown on status screen', async () => {
            statusScreen = await test.OpenStatusScreen();
            expect(statusScreen.HeaderSection.CGMSignalLossLabel).toBeVisible();
        });
    });
    describe('immediate alert', () => {
        beforeAll(async () => {
            let cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.ImmediateAlert } });
            await cgmScreen.DismissAlert('FG OK');
            await cgmScreen.BackButton.tap();
        });
        afterAll(async () => {
            let cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.RetractAlertAbove } });
            await cgmScreen.BackButton.tap();
        });
        it('and check error shown on status screen', async () => {
            let statusScreen = await test.OpenStatusScreen();
            expect(statusScreen.HeaderSection.CGMAlertLabel).toBeVisible();
        });
    });
};
