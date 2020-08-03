var homeInsulinDeliveryScreen = (test) => {
    var insulinDeliveryScreen;
    beforeAll(async () => {
        insulinDeliveryScreen = await test.homeScreen.OpenInsulinDeliveryChart();
    });
    afterAll(async () => {
        await insulinDeliveryScreen.BackAction();
    });
    it('has a header', async () => {
        await expect(insulinDeliveryScreen.Header()).toBeVisible();
    });
    it('has a IOB Label', async () => {
        await expect(insulinDeliveryScreen.IOBLabel()).toBeVisible();
    });
    it('has a Total Label', async () => {
        await expect(insulinDeliveryScreen.TotalLabel()).toBeVisible();
    });
    it('has an Event History Label', async () => {
        await expect(insulinDeliveryScreen.EventHistoryLabel()).toBeVisible();
    });
    it('has a Reservoir Label', async () => {
        await expect(insulinDeliveryScreen.ReservoirLabel()).toBeVisible();
    });
    it('has a Back Button', async () => {
        await expect(insulinDeliveryScreen.BackButtonControl()).toBeVisible();
    });
};

module.exports = {
    homeInsulinDeliveryScreen
};
