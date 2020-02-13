const element = require('detox').element;
const match = require('./match');

const cgm = {
    /**
     * @name simulatorModel
     * @summary CGM model that can be applied to the simulator
     */
    simulatorModel: {
        Constant: { value: 0, name: "Constant" },
        SineCurve: { value: 1, name: "Sine Curve" },
        None: { value: 2, name: "No Data" }
    },
    /**
     * @name simulatorEffects
     * @summary CGM effects that can be applied to the simulator
     */
    simulatorEffects: {
        GlucoseNoise: { value: 0, name: "Glucose Noise" },
        RandomHighOutlier: { value: 1, name: "Random High Outlier" },
        RandomLowOutlier: { value: 2, name: "Random Low Outlier" },
        RandomError: { value: 3, name: "Random Error" }
    },
    async add() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Add CGM').tap();
        await match.accessible.Button('Simulator').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    async setEffect(effect) {
        await match.accessible.ButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessible.Label('Simulator').atIndex(1).tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label(effect.name).tap();
        switch (effect) {
            case this.simulatorEffects.GlucoseNoise:
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText('100');
                await match.buttonBarButton('Back').tap();
                break;
            case this.simulatorEffects.RandomError:
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText('10');
                await match.buttonBarButton('Back').tap();
                break;
            default:
                break;
        }
        //TODO: multiple done buttons
        await match.accessible.ButtonBarButton('Done').atIndex(0).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
    * @param {simulatorModel} model e.g. Constant
    * @param {Array} bgValues e.g. [100, 50]
    */
    async setModel(model, bgValues) {
        await match.accessible.ButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessible.Label('Simulator').atIndex(1).tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label(model.name).tap();
        switch (model) {
            case this.simulatorModel.Constant:
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[0]);
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            case this.simulatorModel.SineCurve:
                await match.accessible.Label('Base Glucose').tap();
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[0]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.Label('Amplitude').tap();
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[1]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            default:
                break;
        }
        //TODO: multiple done buttons
        await match.accessible.ButtonBarButton('Done').atIndex(0).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    async remove() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Label('Simulator').tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label('Delete CGM').tap();
        await match.accessible.Label('Delete CGM').atIndex(1).tap();
        await waitFor(match.accessible.Label('Add CGM')).toExist().withTimeout(2000);
        await match.accessible.ButtonBarButton('Done').tap();
    },
    async removeData() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessible.Label('Delete CGM Data').atIndex(0).tap();
        await match.accessible.Label('Delete CGM Data').atIndex(1).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    }
};

module.exports = cgm;