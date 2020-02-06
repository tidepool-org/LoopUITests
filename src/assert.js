const element = require('detox').element;
const match = require('./match');

const assert = {
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    async isAccessibilityButton(label) {
        return expect(match.accessibilityButton(label)).toExist() || expect(match.accessibilityBackButton(label)).toExist() || expect(match.accessibilityButtonBarButton(label)).toExist();
    },
    /**
     * @param {string} text
     * @returns {Detox.Expect}
     */
    isAccessibilityText(text) {
        return expect(match.accessibilityLabelText(text)).toExist() || expect(match.accessibilityText(text)).toBeVisible()
    },
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    isAccessibilitySelected(label) {
        return expect(element(by.label(label).and(by.traits(['selected'])))).toExist();
    },
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    isAccessibilityHeader(label) {
        return expect(element(by.label(label).and(by.traits(['header'])))).toExist();
    },
};

module.exports = assert;
