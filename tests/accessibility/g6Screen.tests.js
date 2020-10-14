module.exports = (test) => {
    var screen;
    var homeScreen;
    beforeAll(async () => {
        homeScreen = await test.OpenHomeScreen();
        screen = await homeScreen.HeaderSection.Devices.AddG6();
    });
    afterAll(async () => {
        await screen.BackButton.tap();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a enter code button', async () => {
        await expect(screen.EnterCodeButton()).toBeVisible();
    });
    it('has a no code button', async () => {
        await expect(screen.NoCodeButton()).toBeVisible();
    });
    it('has a device image', async () => {
        await expect(screen.DeviceImage()).toBeVisible();
    });
};
