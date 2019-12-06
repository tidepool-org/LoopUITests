const loop_setup = require('../../src/loopUI').setup;

describe('scenario test', () => {
    beforeAll(async () => {
        await loop_setup.lauchLoop();
    });
    describe('simulators setup', () => {
        it('should set closed loop', async () => {
            await loop_setup.setClosedLoop();
        });
        it('should add simulator pump', async () => {
            await loop_setup.addSimulatorPump();
        });
        it('should configure simulator pump', async () => {
            await loop_setup.simulatorPumpBasalSettings('0.1 U/hr');
            await loop_setup.simulatorPumpDeliveryLimitsSettings('1.0', '10.0');
        });
        it('should add simulator CGM', async () => {
            await loop_setup.addSimulatorCGM();
        });
        it('should configure simulator CGM', async () => {
            await loop_setup.addSimulatorCGMModel(loop_setup.CGMSimulatorModel.Constant, ['100']);
        });
    });
});

