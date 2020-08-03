var homeActiveCarbohydratesScreen = (test) => {
    var screen;
    var homeScreen;
    beforeAll(async () => {
        homeScreen = await test.OpenHomeScreen();
        screen = await homeScreen.OpenActiveCarbohydratesChart();
    });
    afterAll(async () => {
        await screen.BackAction();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a COB Label', async () => {
        await expect(screen.COBLabel()).toBeVisible();
    });
    it('has a Total Label', async () => {
        await expect(screen.TotalLabel()).toBeVisible();
    });
    it('has an Glucose Change Label', async () => {
        await expect(screen.GlucoseChangeLabel()).toBeVisible();
    });
    it('has a Observed Label', async () => {
        await expect(screen.ObservedLabel()).toBeVisible();
    });
    it('has a Predicted Label', async () => {
        await expect(screen.PredictedLabel()).toBeVisible();
    });
    it('has a Back Button', async () => {
        await expect(screen.BackButtonControl()).toBeVisible();
    });
};

module.exports = {
    homeActiveCarbohydratesScreen
};
