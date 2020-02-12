const element = require('detox').element;

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
     * @summary get a LoopKitUI.PaddedTextField element
     * @returns {Detox.Element}
     */
    loopTextField() {
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
        return element(by.label(text).and(by.traits(['text']).and(by.traits(['header']))));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityHeader
     */
    accessibilityHeader(text) {
        return element(by.text(text).and(by.traits(['header'])));
    },
    uiTextField(){
        return element(by.type('UITextField'));
    },
};

module.exports = match;
