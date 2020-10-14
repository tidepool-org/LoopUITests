module.exports = (test, cmgData) => {
    describe('signal loss', () => {
        let cgmScreen;
        let homeScreen;
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
        it('and check error shown on home screen', async () => {
            homeScreen = await test.OpenHomeScreen();
            expect(homeScreen.HeaderSection.CGMSignalLossLabel()).toBeVisible();
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
        it('and check error shown on home screen', async () => {
            let homeScreen = await test.OpenHomeScreen();
            expect(homeScreen.HeaderSection.CGMAlertLabel()).toBeVisible();
        });
    });
};
