module.exports = (test) => {
    var screen;

    it('add simulator', async () => {
        await test.addCGM();
    });
    it('open simulator', async () => {
        screen = await test.openCGMScreen();
    });
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
    describe('no data error', () => {
        it('stop data', async () => {
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
        it('reset to constant data', async () => {
            screen = await test.openCGMScreen();
            await screen.Apply({
                model: { name: screen.screenText.Model.Constant, bgValues: [99] }
            });
            await screen.Back();
        });
    });
    describe('random error', () => {
        it('set data frequency', async () => {
            screen = await test.openCGMScreen();
            await screen.Apply({
                frequency: { seconds: true }
            });
            await screen.Back();
        });
        it('apply error on 100% of readings', async () => {
            screen = await test.openCGMScreen();
            await screen.Apply({
                effect: { randomErrorPercent: 100 }
            });
            await screen.Back();
        });
        it('should show error', async () => {
            let home = await test.OpenHomeScreen();
            await home.HeaderSection().ExpectLoopAlert();
        });
    });
    it('remove simulator', async () => {
        screen = await test.openCGMScreen();
        await screen.RemoveSimulator();
    });
};
