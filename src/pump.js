const element = require('detox').element;
const match = require('./match');

/**
 * @summary represents the pump simulator
 */
const pump = {
    /**
     * @name pump.AddSimulator
     * @summary add the simulator pump for loop
     */
    async AddSimulator() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Add Pump').tap();
        match.accessible.HeaderText('Pump Settings');
        await match.accessible.Button('Simulator').tap();
        await match.accessible.Button('Continue').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.remove
     * @summary remove the simulator pump for loop
     */
    async Remove() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Label('Simulator').tap();
        match.accessible.HeaderText('Pump Settings');
        //TODO static text and not a button?
        await match.accessible.Label('Delete Pump').tap();
        await match.accessible.Label('Delete Pump').atIndex(1).tap();
        await waitFor(match.accessible.Label('Add Pump')).toExist().withTimeout(2000);
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.RemoveData
     * @summary remove the simulator pump data for loop
     */
    async RemoveData() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessible.Label('Delete Pump Data').atIndex(0).tap();
        await match.accessible.Label('Delete Pump Data').atIndex(1).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },

    /**
     * @summary add a bolus
     * @param {string} units
     */
    async Bolus(units) {
        await match.accessible.Button('Bolus').tap();
        //TODO: why can't we match on label? by.label('Bolus Amount')
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(units);
        await element(by.type('UIButton').and(by.label('Deliver')).and(by.traits(['button']))).tap();
        //TODO: can't interact with auth screen as long time pause before ready
        await waitFor(element(by.type('UITextField'))).toExist().withTimeout(1400);
        await element(by.type('UITextField')).typeText('fake_pw');
        await element(by.type('UITextField')).tapReturnKey();
    },
};

module.exports = pump;