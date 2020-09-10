const element = require('detox').element;

const staticTextTrait = 'text';
const buttonTrait = 'button';
const imageTrait = 'image';

const match = {
    /**
     * @summary items that have accessibility traits applied to them
     */
    accessible: {
        ButtonBarButton(label) {
            return element(by.type('_UIButtonBarButton').withDescendant(by.label(label).and(by.traits([buttonTrait]))));
        },
        BackButton(label) {
            return element(by.label(label).and(by.traits([buttonTrait]).and(by.type('UIAccessibilityBackButtonElement'))));
        },
        Button(label) {
            return element(by.label(label).and(by.traits([buttonTrait])));
        },
        SwipeButton(label) {
            return element(by.label(label).and(by.traits([buttonTrait]).and(by.type('UISwipeActionStandardButton'))));
        },
        SwitchButton(label) {
            return element(by.type('UISwitch').and(by.label(label).and(by.traits([buttonTrait]))));
        },
        Id(theId) {
            return element(by.id(theId));
        },
        TextLabel(label) {
            return element(by.label(label).and(by.traits([staticTextTrait])));
        },
        ClickableLabel(label) {
            return element(by.type('UITableViewCellContentView').withDescendant(by.label(label).and(by.traits([staticTextTrait]))));
        },
        Image(label) {
            return element(by.label(label).and(by.traits([imageTrait])));
        },
        ImageAndId(label, theId) {
            return element(by.label(label).and(by.traits([imageTrait]).and(by.id(theId))));
        },
        Header(label) {
            return element(by.label(label).and(by.traits(['header'])));
        },
        PickerItem(itemID) {
            return element(by.type('UIPickerTableViewWrapperCell').withDescendant(by.id(itemID)));
        },
        Picker(index) {
            if (index == null) {
                index = 1;
            }
            return element(by.type('UIPickerView')).atIndex(index);
        },
        QuantityPicker(id) {
            return element(by.label('Quantity').and(by.id(id)));
        },
        AlertLabel(label) {
            return element(by.label(label).and(by.traits([staticTextTrait])).withAncestor(by.type('_UIAlertControllerInterfaceActionGroupView')));
        },
        AlertButton(label) {
            return element(by.label(label).and(by.traits([buttonTrait])).and(by.type('_UIAlertControllerActionView')));
        },
        Alert() {
            return element(by.type('_UIAlertControllerInterfaceActionGroupView'));
        },
    },
    loop: {
        /**
         * @summary returns the loop icon element that can be tapped to get current loop state details
         *
         * @example await match.loop.Icon().tap()
         */
        Icon() {
            return element(by.type('LoopUI.LoopCompletionHUDView'));
        },
        /**
         * @summary returns elements that relate to current loop state
         * 1st element has pump battery charge remaining e.g. `50%`
         *
         * @example await expect(match.loop.CompletionInfo()).toHaveLabel('50%')
         */
        CompletionInfo() {
            return element(by.type('UILabel').and(by.traits([staticTextTrait])).withAncestor(by.type('LoopUI.LoopCompletionHUDView')));
        },
        /**
        * @summary returns elements that relate to pump battery info
        * 1st element has pump battery charge remaining e.g. `50%`
        *
        * @example await match.loop.BatteryLevelInfo()
        */
        BatteryLevelInfo() {
            return element(by.type('UILabel').and(by.traits([staticTextTrait])).withAncestor(by.type('LoopKitUI.BatteryLevelHUDView')));
        },
        /**
         * @summary returns elements that relate to pump reservoir info
         * 1st element has units remaining e.g. `200U`
         * 2nd element has time detail e.g. `8:21 AM`
         *
         * @example await match.loop.ReservoirVolumeInfo()
         */
        ReservoirVolumeInfo() {
            return element(by.type('UILabel').and(by.traits([staticTextTrait])).withAncestor(by.type('LoopKitUI.ReservoirVolumeHUDView')));
        },
        /**
         * @summary returns elements that relate to basal rate info
         * 1st element has time detail e.g. `8:21 AM`
         * 2nd element has the units e.g. `+0.0 U`
         *
         * @example await match.loop.BasalRateInfo()
         */
        BasalRateInfo() {
            return element(by.type('UILabel').and(by.traits([staticTextTrait])).withAncestor(by.type('LoopUI.BasalRateHUDView')));
        },
        /**
         * @summary returns elements that relate to blood glucose info
         * 2nd element has value detail e.g. `110`
         * 3rd element has the units e.g. `mg/dL`
         * 4th element has time detail e.g. `8:21 AM`
         *
         * @example await match.loop.GlucoseInfo()
         */
        GlucoseInfo() {
            return element(by.type('UILabel').and(by.traits([staticTextTrait])).withAncestor(by.type('LoopUI.GlucoseHUDView')));
        },
    },
    UIEditableTextField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    UITextField() {
        return element(by.type('UITextField'));
    },
    ScrollableView() {
        return element(by.type('UITableView'));
    },
    Text(theText) {
        return element(by.text(theText));
    },
    Label(label) {
        return element(by.label(label));
    }
};

module.exports = match;
