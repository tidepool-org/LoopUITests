var homeScreen = (test) => {
    var homeScreen;
    it('get home screen', async () => {
        homeScreen = await test.OpenHomeScreen();
    });
    it('has Active Carbohydrates section', async () => {
        var screen = await homeScreen.OpenActiveCarbohydratesChart();
        await screen.Back();
    });
    it('has Active Insulin section', async () => {
        var screen = await homeScreen.OpenActiveInsulinChart();
        await screen.Back();
    });
    it('has Insulin Delivery section', async () => {
        var screen = await homeScreen.OpenInsulinDeliveryChart();
        await screen.Back();
    });
    it('has Glucose section', async () => {
        var screen = await homeScreen.OpenGlucoseChart();
        await screen.Back();
    });
    it('has Loop icon', async () => {
        await homeScreen.ExpectLoopNotYetRun();
    });
    describe('header', () => {
        it('can add pump', async () => {
            await homeScreen.HeaderSection().Devices().AddPump();
        });
        it('can remove pump', async () => {
            let pump = await homeScreen.HeaderSection().Devices().OpenPumpScreen();
            await pump.RemoveSimulator();
        });
        it('can add CGM', async () => {
            await homeScreen.HeaderSection().Devices().AddCGM();
        });
        it('can remove CGM', async () => {
            let cgm = await homeScreen.HeaderSection().Devices().OpenCGMScreen();
            await cgm.RemoveSimulator();
        });
    });
};

module.exports = {
    homeScreen
};
