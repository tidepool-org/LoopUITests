module.exports = (test) => {
    var screen;
    it('add simulator', async () => {
        await test.addCGM();
    });
    it('open simulator', async () => {
        screen = await test.openCGMScreen();
    });
    describe('no data error', () => {
        it('get constant data', async () => {
            await screen.Apply({
                model: { name: screen.screenText.Model.Constant, bgValues: [99] }
            });
            await screen.Back();
        });
        it('backfill data', async () => {
            screen = await test.openCGMScreen();
            await screen.Apply({
                history: { name: screen.screenText.History.BackfillGlucose, backfillHours: 5, }
            });
        });
        it('and then stop', async () => {
            screen = await test.openCGMScreen();
            await screen.Apply({
                model: { name: screen.screenText.Model.None, }
            });
            await screen.Back();
        });
        it('should show missing glucose data error', async () => {
            let home = await test.OpenHomeScreen();
            await home.HeaderSection().ExpectLoopStatusGlucoseDataAlert();
        });
    });
    it('remove simulator', async () => {
        screen = await test.openCGMScreen();
        await screen.RemoveSimulator();
    });
};
