const match = require("../../src/match");

module.exports = (test) => {
    describe('signal loss', () => {
        let cgmScreen;
        let statusScreen;
        beforeAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ model: { name: cgmScreen.screenText.Model.SignalLoss } });
        });
        afterAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply(test.CGMData);
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
        let cgmScreen;
        beforeAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.ImmediateAlert } });
        });
        afterAll(async () => {
            cgmScreen = await test.OpenCGMScreen();
            await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.RetractAlertAbove } });
            await cgmScreen.BackButton.tap();
        });
        it('dismiss immediate alert', async () => {
            match.ElementIsVisible(cgmScreen.Alert('FG OK'));
            await cgmScreen.DismissAlert('FG OK');
            await cgmScreen.BackButton.tap();
        });
        it('and check error shown on status screen', async () => {
            let statusScreen = await test.OpenStatusScreen();
            expect(statusScreen.HeaderSection.CGMAlertLabel).toBeVisible();
        });
    });
};
