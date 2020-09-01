module.exports = (test) => {
    var screen;
    var homeScreen;
    beforeAll(async () => {
        homeScreen = await test.OpenHomeScreen();
        screen = await homeScreen.OpenActiveCarbohydratesChart();
    });
    afterAll(async () => {
        await screen.Back();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a Grams Active Carbs Label', async () => {
        await expect(screen.GramsActiveCarbsLabel()).toBeVisible();
    });
    it('has a Grams Total Carbs Label', async () => {
        await expect(screen.GramsTotalCarbsLabel()).toBeVisible();
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
        await expect(screen.BackButton()).toBeVisible();
    });
};
