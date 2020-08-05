var customPresetsScreen = (test) => {
    var screen;
    it('has to open the screen', async () => {
        screen = await test.OpenCustomPresetScreen();
    });
    it('has a Header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a Cancel Header Button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a Edit Header Button', async () => {
        await expect(screen.EditButton()).toBeVisible();
    });
    it('has a Add Header Button', async () => {
        await expect(screen.AddButton()).toBeVisible();
    });
    it('can cancel and then close the screen', async () => {
        await screen.CancelAndClose();
    });
};

module.exports = {
    customPresetsScreen
};
