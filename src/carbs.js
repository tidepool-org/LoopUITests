const element = require('detox').element;
const match = require('./match');

const carbs = {
    /**
     * @name carbs.add
     * @summary add a meal entry
     * @param {string} carbsAmount
     */
    async add(carbsAmount) {
        await match.accessibilityButton('Add Meal').tap();
        await expect(match.accessibilityHeader('Add Carb Entry')).toExist();
        //TODO: we need a better way to find this
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(carbsAmount);
        await match.accessibilityButtonBarButton('Continue').tap();
        await match.accessibilityButton('Save without Bolusing').tap();
    },
    /**
     * @name carbs.check
     * @summary add a meal entry
     * @param {string} carbsAmount
     */
    async check(carbsAmount) {
        await match.accessibilityText('Active Carbohydrates').tap();
        await expcect(match.accessibilityHeader('Carbohydrates')).toExist();
        //TODO: just checking an instance exits, need to find exact one
        await expect(element(by.label(`${carbsAmount} g`)).atIndex(0)).toExist();
        await match.accessibilityBackButton('Status').tap();
    },
};

module.exports = carbs;