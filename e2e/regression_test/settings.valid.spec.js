const { setup, match, settings, loopSettings } = require('../../src/index');

describe('Closed loop is allowed when', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await device.uninstallApp();
    });
    let config = {
        scenario: 'flat_cgm_trace',
        settings: settings.Defaults,
    };
    it('we apply all settings', async () => {
        await loopSettings.Configure(config);
    });
    it('should advance the scenario so we are looping', async () => {
        await setup.AdvanceScenario(config.scenario, '1');
        await waitFor(match.accessible.ButtonBarButton('Settings')).toExist().withTimeout(2000);
    });
    // it('should show no alert when tapping loop icon', async () => {
    //     await waitFor(match.accessible.AlertLabel('Missing Data: Insulin Effects')).toExist().withTimeout(2000);
    //     await waitFor(element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopUI.LoopCompletionHUDView')))).toHaveLabel('0 min ago').withTimeout(2000);
    // });
});