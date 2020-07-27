var homeActiveInsulinScreen = (test) => {
    var activeInsulinScreen;
    beforeAll(async () => {
        activeInsulinScreen = await test.homeScreen.OpenActiveInsulinChart();
    });
    afterAll(async () => {
        await activeInsulinScreen.Back();
    });
    it('has a header', async () => {
        await expect(activeInsulinScreen.Header()).toExist();
    });
    it('has a IOB Label', async () => {
        await expect(activeInsulinScreen.IOBLabel()).toExist();
    });
    it('has a Total Label', async () => {
        await expect(activeInsulinScreen.TotalLabel()).toExist();
    });
    it('has an Event History Label', async () => {
        await expect(activeInsulinScreen.EventHistoryLabel()).toExist();
    });
    it('has a Reservoir Label', async () => {
        await expect(activeInsulinScreen.ReservoirLabel()).toExist();
    });
    it('has a Back Button', async () => {
        await expect(activeInsulinScreen.BackButton()).toExist();
    });
};

module.exports = {
    homeActiveInsulinScreen
};
