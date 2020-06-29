var carbEntryScreen = (test) => {
    it('open dialog', async () => {
        await test.carbEntryScreen.Open();
    });
    it('cancel dialog', async () => {
        await test.carbEntryScreen.Cancel();
    });
    it('set carbs and save without a bolus', async () => {
        await test.carbEntryScreen.Open();
        await test.carbEntryScreen.SetCarbs('30');
        await test.carbEntryScreen.ContinueToBolus();
        await test.carbEntryScreen.SaveWithoutBolus();
    });
};

module.exports = {
    carbEntryScreen
};
