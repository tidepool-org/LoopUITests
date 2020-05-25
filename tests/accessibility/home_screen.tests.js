var homeScreenAccessibilityTests = (test) => {
    it('has a Active Carbohydrates Label', async () => {
        await expect(test.homeScreen.ActiveCarbohydratesLabel()).toExist();
    });
    it('has a Active Insulin Label', async () => {
        await expect(test.homeScreen.ActiveInsulinLabel()).toExist();
    });
    it('has a Insulin Delivery Label', async () => {
        await expect(test.homeScreen.InsulinDeliveryLabel()).toExist();
    });
    it('has a Glucose Label', async () => {
        await expect(test.homeScreen.GlucoseLabel()).toExist();
    });
    it('has a Settings Button', async () => {
        await expect(test.homeScreen.SettingsButton()).toExist();
    });
    it('has a Add Meal Button', async () => {
        await expect(test.homeScreen.AddMealButton()).toExist();
    });
    it('has a Bolus Button', async () => {
        await expect(test.homeScreen.BolusButton()).toExist();
    });
};


module.exports = {
    homeScreenAccessibilityTests
};
