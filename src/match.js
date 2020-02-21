const element = require('detox').element;

const match = {
    /**
     * @summary items that have accessibility traits applied to them
     */
    accessible: {
        /**
         * @param {string} label
         * @returns {Detox.Element} ButtonBarButton
         */
        ButtonBarButton(label) {
            return ButtonBarButton(label, true);
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
        /*
        * @summary returns Picker item(s) for given label and index
        * @param {Integer} index
        * @param {string} label
        * @returns {Detox.Element}
        */
        PickerItem(index, label) {
            return element(by.type('UILabel').and(by.label(label).and(by.traits(['text']))).withAncestor(by.type('UIPickerTableViewTitledCell'))).atIndex(index);
        },
        AlertLabel(label){
            return element(by.label(label).and(by.traits(['text'])).withAncestor(by.type('_UIAlertControllerInterfaceActionGroupView')));
        },
    },
    /**
     * @summary get a non accessible UIEditableTextField
     * @returns {Detox.Element} UIEditableTextField
     */
    UIEditableTextField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    /**
     * @summary returns none accessible ButtonBarButton
     * @param {string} label
     * @returns {Detox.Element} ButtonBarButton
     */
    ButtonBarButton(label) {
        return element(by.label(label).and(by.type('_UIButtonBarButton')));
    },
};

module.exports = match;
