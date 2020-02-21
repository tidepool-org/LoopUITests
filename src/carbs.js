const element = require('detox').element;
const match = require('./match');

const carbs = {
    /**
     * @name carbs.Add
     * @summary add a meal entry
     * @param {string} carbsAmount
     */
    async Add(carbsAmount) {
        await match.accessible.Button('Add Meal').tap();
        await expect(match.accessible.Header('Add Carb Entry')).toExist();
        //TODO: we need a better way to find this
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(carbsAmount);
        await match.accessible.ButtonBarButton('Continue').tap();
        await match.accessible.Button('Save without Bolusing').tap();
    },
    /**
     * @name carbs.Check
     * @summary add a meal entry
     * @param {string} carbsAmount
     */
    async Check(carbsAmount) {
        await match.accessible.Text('Active Carbohydrates').tap();
        await expcect(match.accessible.Header('Carbohydrates')).toExist();
        //TODO: just checking an instance exits, need to find exact one
        await expect(element(by.label(`${carbsAmount} g`)).atIndex(0)).toExist();
        await match.accessible.BackButton('Status').tap();
    },
};

module.exports = carbs;