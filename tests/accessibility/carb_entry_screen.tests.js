var carbEntryScreenAccessibilityTests = (test) => {
    var carbEntryScreen;
    it('has to open the Carb Entry screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it('has a Add Carb Entry Header', async () => {
        await expect(carbEntryScreen.AddCarbEntryHeader()).toExist();
    });
    it('has a Cancel Header Button', async () => {
        await expect(carbEntryScreen.CancelHeaderButton()).toExist();
    });
    it('has a Disabled Continue Main Button', async () => {
        await expect(carbEntryScreen.DisabledContinueMainButton()).toExist();
    });
    it('has a Disabled Continue Header Button', async () => {
        await expect(carbEntryScreen.DisabledContinueHeaderButton()).toExist();
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
    carbEntryScreenAccessibilityTests
};
