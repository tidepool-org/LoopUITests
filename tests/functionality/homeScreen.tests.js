var homeScreen = (test) => {
    it('has Active Carbohydrates section', async () => {
        var screen = await test.homeScreen.OpenActiveCarbohydratesChart();
        await screen.Back();
    });
    it('has Active Insulin section', async () => {
        var screen = await test.homeScreen.OpenActiveInsulinChart();
        await screen.Back();
    });
    it('has Insulin Delivery section', async () => {
        var screen = await test.homeScreen.OpenInsulinDeliveryChart();
        await screen.Back();
    });
    it('has Glucose section', async () => {
        var screen = await test.homeScreen.OpenGlucoseChart();
        await screen.Back();
    });
    it('has Loop icon', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
};

module.exports = {
    homeScreen
};
