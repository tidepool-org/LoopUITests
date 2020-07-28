var homeInsulinDeliveryScreen = (test) => {
    var insulinDeliveryScreen;
    beforeAll(async () => {
        insulinDeliveryScreen = await test.homeScreen.OpenInsulinDeliveryChart();
    });
    afterAll(async () => {
        await insulinDeliveryScreen.Back();
    });
    it('has a header', async () => {
        await expect(insulinDeliveryScreen.Header()).toExist();
    });
    it('has a IOB Label', async () => {
        await expect(insulinDeliveryScreen.IOBLabel()).toExist();
    });
    it('has a Total Label', async () => {
        await expect(insulinDeliveryScreen.TotalLabel()).toExist();
    });
    it('has an Event History Label', async () => {
        await expect(insulinDeliveryScreen.EventHistoryLabel()).toExist();
    });
    it('has a Reservoir Label', async () => {
        await expect(insulinDeliveryScreen.ReservoirLabel()).toExist();
    });
    it('has a Back Button', async () => {
        await expect(insulinDeliveryScreen.BackButton()).toExist();
    });
};

module.exports = {
    homeInsulinDeliveryScreen
};
