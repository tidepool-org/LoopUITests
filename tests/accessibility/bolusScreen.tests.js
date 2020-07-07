var bolusScreen = (test) => {
    var bolusScreen;
    it('has to open the bolus screen', async () => {
        bolusScreen = await test.OpenBolusScreen();
    });
    it('has a Header', async () => {
        await expect(bolusScreen.Header()).toExist();
    });
    it('has a Deliver Button', async () => {
        await expect(bolusScreen.DeliverButton()).toExist();
    });
    it('has a Disabled Deliver Button', async () => {
        await expect(bolusScreen.DisabledDeliverButton()).toExist();
    });
    it('has a Recommended Label', async () => {
        await expect(bolusScreen.RecommendedLabel()).toExist();
    });
    it('has a Entered Label', async () => {
        await expect(bolusScreen.EnteredLabel()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(bolusScreen.CancelButton()).toExist();
    });
    it('has to close the bolus screen', async () => {
        await bolusScreen.Cancel();
    });
};

module.exports = {
    bolusScreen
};
