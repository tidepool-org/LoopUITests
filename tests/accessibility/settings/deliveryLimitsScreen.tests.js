module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    it('open', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenDeliveryLimitsScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a cancel button', async () => {
        await expect(screen.BackButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
    it('has a max bolus label ', async () => {
        await expect(screen.MaxBolusLabel()).toExist();
    });
    it('has a max bolus info ', async () => {
        await expect(screen.MaxBolusInfo()).toExist();
    });
    it('has a max basal rate label ', async () => {
        await expect(screen.MaxBasalRateLabel()).toExist();
    });
    it('has a max basal rate info ', async () => {
        await expect(screen.MaxBasalRateInfo()).toExist();
    });
    it('cleanup and close', async () => {
        await screen.CancelAndClose();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
