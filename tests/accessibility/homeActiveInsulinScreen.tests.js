var homeActiveInsulinScreen = (test) => {
    var activeInsulinScreen;
    beforeAll(async () => {
        activeInsulinScreen = await test.homeScreen.OpenActiveInsulinChart();
    });
    afterAll(async () => {
        await activeInsulinScreen.BackAction();
    });
    it('has a header', async () => {
        await expect(activeInsulinScreen.Header()).toBeVisible();
    });
    it('has a IOB Label', async () => {
        await expect(activeInsulinScreen.IOBLabel()).toBeVisible();
    });
    it('has a Total Label', async () => {
        await expect(activeInsulinScreen.TotalLabel()).toBeVisible();
    });
    it('has an Event History Label', async () => {
        await expect(activeInsulinScreen.EventHistoryLabel()).toBeVisible();
    });
    it('has a Reservoir Label', async () => {
        await expect(activeInsulinScreen.ReservoirLabel()).toBeVisible();
    });
    it('has a Back Button', async () => {
        await expect(activeInsulinScreen.BackButtonControl()).toBeVisible();
    });
};

module.exports = {
    homeActiveInsulinScreen
};
