const element = require('detox').element;

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

const match = {
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityButtonBarButton
     */
    accessibilityButtonBarButton(label) {
        return accessibilityButtonBarButton(label, true);
    },
    /**
     *
     * @param {string} label
     * @param {boolean} enabled
     */
    accessibilityButtonBarButton(label, enabled) {
        accessibilityTraits = ['button'];
        if (enabled == false) {
            accessibilityTraits.push('disabled');
        }
        return element(by.label(label).and(by.traits(accessibilityTraits).and(by.type('_UIButtonBarButton'))));
    },

    /**
     * @summary get a text field element
     * @returns {Detox.Element}
     */
    textField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityButton
     */
    accessibilityButton(label) {
        return element(by.label(label).and(by.traits(['button'])));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityBackButton
     */
    accessibilityBackButton(label) {
        return element(by.label(label).and(by.traits(['button']).and(by.type('UIAccessibilityBackButtonElement'))));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} buttonBarButton
     */
    buttonBarButton(label) {
        return element(by.label(label).and(by.type('_UIButtonBarButton')));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityLabelText
     */
    accessibilityLabelText(label) {
        return element(by.label(label).and(by.traits(['text'])));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityText
     */
    accessibilityText(text) {
        return element(by.text(text).and(by.traits(['text'])));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityHeaderText
     */
    accessibilityHeaderText(text) {
        return element(by.text(text).and(by.traits(['text']).and(by.traits(['header']))));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityHeader
     */
    accessibilityHeader(text) {
        return element(by.text(text).and(by.traits(['header'])));
    },
};

module.exports = {
    match,
    assert
};
