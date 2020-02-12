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
        await match.accessibilityButtonBarButton('Settings').tap();
        await expect(match.uiLabel('Add CGM')).toExist();
        await match.uiLabel('Add CGM').atIndex(0).tap();
        await match.accessibilityButton('Simulator').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async setEffect(effect) {

        await match.accessibilityButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessibilityLabelText('Simulator').atIndex(1).tap();
        match.accessibilityHeaderText('CGM Settings');
        await match.accessibilityLabelText(effect.name).tap();
        switch (effect) {
            case this.simulatorEffects.GlucoseNoise:
                await match.uiEditableTextField().clearText();
                //mg/dl
                await match.uiEditableTextField().typeText('100');
                //TODO: accessibility
                await element(by.label('Back').and(by.type('_UIButtonBarButton'))).tap();
                break;
            case this.simulatorEffects.RandomError:
                await match.uiEditableTextField().clearText();
                //percent
                await match.uiEditableTextField().typeText('10');
                //TODO: accessibility
                await element(by.label('Back').and(by.type('_UIButtonBarButton'))).tap();
                break;
            default:
                break;
        }
        //TODO: multiple done buttons
        await match.accessibilityButtonBarButton('Done').atIndex(0).tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
    * @param {simulatorModel} model e.g. Constant
    * @param {Array} bgValues e.g. [100, 50]
    */
    async setModel(model, bgValues) {
        await match.accessibilityButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessibilityLabelText('Simulator').atIndex(1).tap();
        match.accessibilityHeaderText('CGM Settings');
        await match.accessibilityLabelText(model.name).tap();
        switch (model) {
            case this.simulatorModel.Constant:
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[0]);
                await match.accessibilityBackButton('CGM Settings').tap();
                break;
            case this.simulatorModel.SineCurve:
                await match.accessibilityLabelText('Base Glucose').tap();
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[0]);
                await match.accessibilityBackButton('Sine Curve').tap();
                await match.accessibilityLabelText('Amplitude').tap();
                await match.uiEditableTextField().clearText();
                await match.uiEditableTextField().typeText(bgValues[1]);
                await match.accessibilityBackButton('Sine Curve').tap();
                await match.accessibilityBackButton('CGM Settings').tap();
                break;
            default:
                break;
        }
        //TODO: multiple done buttons
        await match.accessibilityButtonBarButton('Done').atIndex(0).tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async remove() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityLabelText('Simulator').tap();
        match.accessibilityHeaderText('CGM Settings');
        //TODO static text and not a button?
        await match.accessibilityLabelText('Delete CGM').tap();
        await match.accessibilityLabelText('Delete CGM').atIndex(1).tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async removeData() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await element(by.text('Carb Ratios')).swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessibilityLabelText('Delete CGM Data').atIndex(0).tap();
        await match.accessibilityLabelText('Delete CGM Data').atIndex(1).tap();
        await match.accessibilityButtonBarButton('Done').tap();
    }
};

module.exports = cgm;