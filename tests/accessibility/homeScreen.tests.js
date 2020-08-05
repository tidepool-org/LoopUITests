var homeScreen = (test) => {
    var screen;
    it('has a Active Carbohydrates Label', async () => {
        screen = await test.OpenHomeScreen();
    });
    it('has a Active Carbohydrates Label', async () => {
        await expect(screen.ActiveCarbohydratesLabel()).toBeVisible();
    });
    it('has a Active Insulin Label', async () => {
        await expect(screen.ActiveInsulinLabel()).toBeVisible();
    });
    it('has a Insulin Delivery Label', async () => {
        await expect(screen.InsulinDeliveryLabel()).toBeVisible();
    });
    it('has a Glucose Label', async () => {
        await expect(screen.GlucoseLabel()).toBeVisible();
    });
    it('has a Settings Button', async () => {
        await expect(screen.SettingsButton()).toBeVisible();
    });
    it('has a Add Meal Button', async () => {
        await expect(screen.AddMealButton()).toBeVisible();
    });
    it('has a Bolus Button', async () => {
        await expect(screen.BolusButton()).toBeVisible();
    });
    describe('header', () => {
        it('add pump button', async () => {
            await expect(screen.HeaderSection().Devices().AddPumpButton()).toBeVisible();
        });
        it('add CGM button', async () => {
            await expect(screen.HeaderSection().Devices().AddCGMButton()).toBeVisible();
        });
        it('Loop button', async () => {
            await expect(screen.HeaderSection().LoopIcon()).toBeVisible();
        });
    });
};


module.exports = {
    homeScreen
};
