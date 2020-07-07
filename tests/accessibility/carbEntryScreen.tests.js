var carbEntryScreen = (test) => {
    var carbEntryScreen;
    it('has to open the Carb Entry screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it('has a Add Carb Entry Header', async () => {
        await expect(carbEntryScreen.Header()).toExist();
    });
    it('has a Cancel Button', async () => {
        await expect(carbEntryScreen.CancelButton()).toExist();
    });
    it('has a Disabled Continue Main Button', async () => {
        await expect(carbEntryScreen.DisabledContinueMainButton()).toExist();
    });
    it('has a Disabled Continue Button', async () => {
        await expect(carbEntryScreen.DisabledContinueButton()).toExist();
    });
    it('has a Absorption Time Message', async () => {
        await expect(carbEntryScreen.AbsorptionTimeMessage()).toExist();
    });
    it('has a Absorption Time Label', async () => {
        await expect(carbEntryScreen.AbsorptionTimeLabel()).toExist();
    });
    it('has a Date Label', async () => {
        await expect(carbEntryScreen.DateLabel()).toExist();
    });
    it('has a Amount Consumed Label', async () => {
        await expect(carbEntryScreen.AmountConsumedLabel()).toExist();
    });
    it('has a Food Type Label', async () => {
        await expect(carbEntryScreen.FoodTypeLabel()).toExist();
    });
    it('has to close the Carb Entry screen', async () => {
        await carbEntryScreen.Cancel();
    });
};


module.exports = {
    carbEntryScreen
};
