const element = require('detox').element;
const match = require('./match');

/**
 * @summary represents the cgm simulator
 */
const cgm = {
    /**
     * @name cgm.Model
     * @summary CGM model that can be applied to the simulator
     */
    Model: {
        Constant: { value: 0, name: 'Constant' },
        SineCurve: { value: 1, name: 'Sine Curve' },
        None: { value: 2, name: 'No Data' }
    },
    /**
     * @name cgm.Effect
     * @summary CGM Effect that can be applied to the simulator
     */
    Effect: {
        GlucoseNoise: { value: 0, name: 'Glucose Noise' },
        RandomHighOutlier: { value: 1, name: 'Random High Outlier' },
        RandomLowOutlier: { value: 2, name: 'Random Low Outlier' },
        RandomError: { value: 3, name: 'Random Error' }
    },
    /**
     * @name cgm.AddSimulator
     * @summary add the cgm simulator
     */
    async AddSimulator() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Add CGM').tap();
        await match.accessible.Button('Simulator').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name cgm.Effect
     * @summary set the cgm simulator effect
     * @param {Effect} effect
     */
    async ApplyEffect(effect) {
        await match.accessible.ButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessible.Label('Simulator').atIndex(1).tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label(effect.name).tap();
        switch (effect) {
            case this.Effect.GlucoseNoise:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('100');
                await match.ButtonBarButton('Back').tap();
                break;
            case this.Effect.RandomError:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('10');
                await match.ButtonBarButton('Back').tap();
                break;
            default:
                break;
        }
        //TODO: multiple done buttons
        await match.accessible.ButtonBarButton('Done').atIndex(0).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
    * @param {Model} model e.g. Constant
    * @param {Array} bgValues e.g. [100, 50]
    */
    async ApplyModel(model, bgValues) {
        await match.accessible.ButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessible.Label('Simulator').atIndex(1).tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label(model.name).tap();
        switch (model) {
            case this.Model.Constant:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(bgValues[0]);
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            case this.Model.SineCurve:
                await match.accessible.Label('Base Glucose').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(bgValues[0]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.Label('Amplitude').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(bgValues[1]);
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
    async Remove() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Label('Simulator').tap();
        match.accessible.HeaderText('CGM Settings');
        await match.accessible.Label('Delete CGM').tap();
        await match.accessible.Label('Delete CGM').atIndex(1).tap();
        await waitFor(match.accessible.Label('Add CGM')).toExist().withTimeout(2000);
        await match.accessible.ButtonBarButton('Done').tap();
    },
    async RemoveData() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessible.Label('Delete CGM Data').atIndex(0).tap();
        await match.accessible.Label('Delete CGM Data').atIndex(1).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    }
};

module.exports = cgm;