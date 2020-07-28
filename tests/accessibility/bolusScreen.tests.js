var bolusScreen = (test) => {
    var bolusScreen;
    it('has to open the bolus screen', async () => {
        bolusScreen = await test.OpenBolusScreen();
    });
    it('has a Header', async () => {
        await expect(bolusScreen.Header()).toBeVisible();
    });
    it('has a Cancel Header Button', async () => {
        await expect(bolusScreen.CancelButton()).toBeVisible();
    });
    it('has a Save and Deliver Button', async () => {
        await expect(bolusScreen.SaveAndDeliverButton()).toBeVisible();
    });
    it('has a Recommended Bolus Label', async () => {
        await expect(bolusScreen.RecommendedBolusLabel()).toBeVisible();
    });
    it('has a Recommended Bolus Units Label', async () => {
        await expect(bolusScreen.RecommendedBolusUnits()).toBeVisible();
    });
    it('has a Bolus Label', async () => {
        await expect(bolusScreen.BolusLabel()).toBeVisible();
    });
    it('has a Bolus Units Label', async () => {
        await expect(bolusScreen.BolusUnits()).toBeVisible();
    });
    it('has a Bolus Summary Header', async () => {
        await expect(bolusScreen.BolusSummaryHeader()).toBeVisible();
    });
    it('has a Glucose Header', async () => {
        await expect(bolusScreen.GlucoseHeader()).toBeVisible();
    });
    it('can cancel and then close the bolus screen', async () => {
        await bolusScreen.CancelAndClose();
    });
};

module.exports = {
    bolusScreen
};
