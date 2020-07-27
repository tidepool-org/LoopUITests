var homeGlucoseScreen = (test) => {
    var glucoseScreen;
    beforeAll(async () => {
        glucoseScreen = await test.homeScreen.OpenGlucoseChart();
    });
    afterAll(async () => {
        await glucoseScreen.Back();
    });
    it('has a header', async () => {
        await expect(glucoseScreen.Header()).toExist();
    });
    it('has a Carbohydrates Label', async () => {
        await expect(glucoseScreen.CarbohydratesLabel()).toExist();
    });
    it('has a Insulin Label', async () => {
        await expect(glucoseScreen.InsulinLabel()).toExist();
    });
    it('has a Glucose Momentum Label', async () => {
        await expect(glucoseScreen.GlucoseMomentumLabel()).toExist();
    });
    it('has a Retrospective Correction Label', async () => {
        await expect(glucoseScreen.RetrospectiveCorrectionLabel()).toExist();
    });
    it('has a Back Button', async () => {
        await expect(glucoseScreen.BackButton()).toExist();
    });
};


module.exports = {
    homeGlucoseScreen
};
