module.exports = (test) => {
    var glucoseScreen;
    beforeAll(async () => {
        glucoseScreen = await test.homeScreen.OpenGlucoseChart();
    });
    afterAll(async () => {
        await glucoseScreen.Back();
    });
    it('has a header', async () => {
        await expect(glucoseScreen.Header()).toBeVisible();
    });
    it('has a Carbohydrates Label', async () => {
        await expect(glucoseScreen.CarbohydratesLabel()).toBeVisible();
    });
    it('has a Insulin Label', async () => {
        await expect(glucoseScreen.InsulinLabel()).toBeVisible();
    });
    it('has a Glucose Momentum Label', async () => {
        await expect(glucoseScreen.GlucoseMomentumLabel()).toBeVisible();
    });
    it('has a Retrospective Correction Label', async () => {
        await expect(glucoseScreen.RetrospectiveCorrectionLabel()).toBeVisible();
    });
    it('has a Back Button', async () => {
        await expect(glucoseScreen.BackButton()).toBeVisible();
    });
};
