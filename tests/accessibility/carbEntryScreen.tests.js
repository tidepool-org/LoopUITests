var carbEntryScreen = (test) => {
    var carbEntryScreen;
    it('has to open the Carb Entry screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it('has a Add Carb Entry Header', async () => {
        await expect(carbEntryScreen.Header()).toBeVisible();
    });
    it('has a Cancel Button', async () => {
        await expect(carbEntryScreen.BackButton()).toBeVisible();
    });
    it('has a Disabled Continue Main Button', async () => {
        await expect(carbEntryScreen.ContinueMainButton()).toBeVisible();
    });
    it('has a Absorption Time Message', async () => {
        await expect(carbEntryScreen.AbsorptionTimeMessage()).toBeVisible();
    });
    it('has a Absorption Time Label', async () => {
        await expect(carbEntryScreen.AbsorptionTimeLabel()).toBeVisible();
    });
    it('has a Date Label', async () => {
        await expect(carbEntryScreen.DateLabel()).toBeVisible();
    });
    it('has a Amount Consumed Label', async () => {
        await expect(carbEntryScreen.AmountConsumedLabel()).toBeVisible();
    });
    it('has a Food Type Label', async () => {
        await expect(carbEntryScreen.FoodTypeLabel()).toBeVisible();
    });
    describe('meal bolus', () => {
        var mealBolusScreen;
        it('add carbs', async () => {
            await carbEntryScreen.SetCarbs(10);
        });
        it('open on contune', async () => {
            mealBolusScreen = await carbEntryScreen.Continue();
        });
        it('has a Header', async () => {
            await expect(mealBolusScreen.Header()).toBeVisible();
        });
        it('has a Save without Bolus Button', async () => {
            await expect(mealBolusScreen.SaveWithoutBolusButton()).toBeVisible();
        });
        it('has a Recommended Bolus Label', async () => {
            await expect(mealBolusScreen.RecommendedBolusLabel()).toBeVisible();
        });
        it('has a Recommended Bolus Units Label', async () => {
            await expect(mealBolusScreen.RecommendedBolusUnits()).toBeVisible();
        });
        it('has a Bolus Label', async () => {
            await expect(mealBolusScreen.BolusLabel()).toBeVisible();
        });
        it('has a Bolus Units Label', async () => {
            await expect(mealBolusScreen.BolusUnits()).toBeVisible();
        });
        it('has a Bolus Summary Header', async () => {
            await expect(mealBolusScreen.BolusSummaryHeader()).toBeVisible();
        });
        it('has a Glucose Header', async () => {
            await expect(mealBolusScreen.GlucoseHeader()).toBeVisible();
        });
        it('can go back', async () => {
            await mealBolusScreen.Back();
        });
    });
    it('has to close the Carb Entry screen', async () => {
        await carbEntryScreen.CancelAndClose();
    });
};


module.exports = {
    carbEntryScreen
};
