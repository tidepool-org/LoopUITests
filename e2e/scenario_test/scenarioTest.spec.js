const loop_setup = require('../../src/loopUI').setup;

describe('scenario test', () => {
    beforeAll(async () => {
        await loop_setup.lauchLoop();
    });
    describe('setup', () => {
        it('should add simulator pump', async () => {
            await loop_setup.addSimulatorPump();
        });
        it('should add simulator CGM', async () => {
            await loop_setup.addSimulatorCGM();
        });
        it('should show scenarios when shaken', async()=>{
            device.shake();
        });
    });
});

