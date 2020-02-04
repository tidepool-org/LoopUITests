const { setup, match } = require('../../src/loopUI');

describe('scenario test', () => {
    beforeAll(async () => {
        await setup.lauchLoop();
        await setup.loadScenarios(device.id);
    });
    describe('setup', () => {
        it('should add simulator pump', async () => {
            await setup.addSimulatorPump();
        });
        it('should add simulator CGM', async () => {
            await setup.addSimulatorCGM();
        });
        it('should show scenarios when shaken', async()=>{
            await device.shake();
        });
        it('shows default Sine Curve scenario', async()=>{
            await expect(match.accessibilityLabelText('Sine Curve')).toExist();
        });
        it('canel out of scenarios', async()=>{
            await match.accessibilityButtonBarButton('Cancel').tap();
        });
    });
    describe('Sine Curve', () => {
        it('should show Sine Curve scenario when shaken', async()=>{
            await device.shake();
            await expect(match.accessibilityLabelText('Sine Curve')).toExist();
        });
        it('select scenario', async()=>{
            await match.accessibilityLabelText('Sine Curve').tap();
        });
        it('Load scenario', async()=>{
            await match.accessibilityButtonBarButton('Load').tap();
        });
    });
});

