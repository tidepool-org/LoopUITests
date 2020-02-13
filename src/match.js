const element = require('detox').element;

const match = {
    accessible: {
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityButtonBarButton
         */
        ButtonBarButton(label) {
            return accessibilityButtonBarButton(label, true);
        },
        /**
         *
         * @param {string} label
         * @param {boolean} enabled
         */
        ButtonBarButton(label, enabled) {
            accessibilityTraits = ['button'];
            if (enabled == false) {
                accessibilityTraits.push('disabled');
            }
            return element(by.label(label).and(by.traits(accessibilityTraits).and(by.type('_UIButtonBarButton'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityButton
         */
        Button(label) {
            return element(by.label(label).and(by.traits(['button'])));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityBackButton
         */
        BackButton(label) {
            return element(by.label(label).and(by.traits(['button']).and(by.type('UIAccessibilityBackButtonElement'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityLabelText
         */
        Label(label) {
            return element(by.label(label).and(by.traits(['text'])));
        },
        /**
         * @param {string} text
         * @returns {Detox.Element} accessibilityHeaderText
         */
        HeaderText(text) {
            return element(by.label(text).and(by.traits(['text']).and(by.traits(['header']))));
        },
        /**
         * @param {string} text
         * @returns {Detox.Element} accessibilityHeader
         */
        Header(text) {
            return element(by.text(text).and(by.traits(['header'])));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} labeled element
         */
        UILabel(label) {
            return element(by.label(label).and(by.type('UILabel').and(by.traits(['text']))));
        },
        /**
         * @param {string} text
         * @returns {Detox.Element} accessibilityText
         */
        Text(text) {
            return element(by.text(text).and(by.traits(['text'])));
        },
    },
    /**
     * @summary get a text field element
     * @returns {Detox.Element}
     */
    uiEditableTextField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} buttonBarButton
     */
    buttonBarButton(label) {
        return element(by.label(label).and(by.type('_UIButtonBarButton')));
    },
};

module.exports = match;
