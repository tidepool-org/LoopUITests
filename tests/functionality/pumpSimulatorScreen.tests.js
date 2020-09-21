module.exports = (test) => {
    var screen;
    it('add simulator', async () => {
        await test.addUnconfiguredPump();
    });
    it('open simulator', async () => {
        screen = await test.openPumpScreen();
    });
    //Skip while investiagting timing issue on CI builds
    it.skip('switch errorOnBolus on and off', async () => {
        await screen.Apply({ errorOnBolus: true });
        await expect(screen.ErrorOnBolusSwitch()).toHaveValue('1');
        await screen.Apply({ errorOnBolus: false });
        await expect(screen.ErrorOnBolusSwitch()).toHaveValue('0');
    });
    it.skip('switch errorOnTempBasal on and off', async () => {
        await screen.Apply({ errorOnTempBasal: true });
        await expect(screen.ErrorOnTempBasalSwitch()).toHaveValue('1');
        await screen.Apply({ errorOnTempBasal: false });
        await expect(screen.ErrorOnTempBasalSwitch()).toHaveValue('0');
    });
    it.skip('switch errorOnSuspend on and off', async () => {
        await screen.Apply({ errorOnSuspend: true });
        await expect(screen.ErrorOnSuspendSwitch()).toHaveValue('1');
        await screen.Apply({ errorOnSuspend: false });
        await expect(screen.ErrorOnSuspendSwitch()).toHaveValue('0');
    });
    it.skip('switch errorOnResume on and off', async () => {
        await screen.Apply({ errorOnResume: true });
        await expect(screen.ErrorOnResumeSwitch()).toHaveValue('1');
        await screen.Apply({ errorOnResume: false });
        await expect(screen.ErrorOnResumeSwitch()).toHaveValue('0');
    });
    it('set battery percent', async () => {
        await screen.Apply({ batteryRemaining: 80 });
    });
    it('set reservoir remaining units', async () => {
        await screen.Apply({ reservoirRemaining: 99 });
    });
    it('can be removed', async () => {
        await screen.RemoveSimulator();
    });
};
