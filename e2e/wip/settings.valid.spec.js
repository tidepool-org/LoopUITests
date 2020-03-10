const { setup, loopSettings, SettingDefault } = require('../../src/index');

describe('Closed loop is allowed when', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    let config = {
        scenario: 'flat_cgm_trace',
        settings: SettingDefault,
    };
    it('we apply all settings', async () => {
        await loopSettings.Configure(config);
    });
    it('should advance the scenario so we are looping', async () => {
        await setup.AdvanceScenario(config.scenario, '1');
    });
    // TODO: investigate detox crash after the data has been advanced to a 'looping' state
    // it('should show no alert when tapping loop icon', async () => {
    //     await waitFor(match.accessible.AlertLabel('Missing Data: Insulin Effects')).toExist().withTimeout(2000);
    //     await waitFor(element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopUI.LoopCompletionHUDView')))).toHaveLabel('0 min ago').withTimeout(2000);
    // });
});
