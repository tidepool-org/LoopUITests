var homeScreenFunctionalityTests = (test) => {
    it('has Active Carbohydrates section', async () => {
        await test.homeScreen.OpenActiveCarbohydratesChart();
        await test.homeScreen.CloseChart();
    });
    it('has Active Insulin section', async () => {
        await test.homeScreen.OpenActiveInsulinChart();
        await test.homeScreen.CloseChart();
    });
    it('has Insulin Delivery section', async () => {
        await test.homeScreen.OpenInsulinDeliveryChart();
        await test.homeScreen.CloseChart();
    });
    it('has Glucose section', async () => {
        await test.homeScreen.OpenGlucoseChart();
        await test.homeScreen.CloseChart();
    });
    it('has Loop icon', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it.skip('has Loop icon has alert when not setup', async () => {
        await test.homeScreen.ExpectLoopStatusGlucoseDataAlert();
    });
};

module.exports = {
    homeScreenFunctionalityTests
};
