/* eslint-disable no-undef */
const { element } = require('detox');

const staticTextTrait = 'staticText';
const imageTrait = 'image';

const match = {
  /**
   * @summary items that have accessibility traits applied to them
   */
  accessible: {
    Alert() {
      return element(by.type('_UIAlertControllerInterfaceActionGroupView'));
    },
    AlertButton(label) {
      return element(
        by
          .label(label)
          .and(by.traits([buttonTrait]))
          .and(by.type('_UIAlertControllerActionView')),
      );
    },
    AlertLabel(label) {
      return element(
        by
          .label(label)
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('_UIAlertControllerInterfaceActionGroupView')),
      );
    },
    ButtonBarButton(label) {
      return element(
        by
          .type('_UIButtonBarButton')
          .and(by.label(label)),
      );
    },
    BackButton(label) {
      return element(
        by
          .label(label)
          .and(
            by
              .traits([buttonTrait])
              .and(by.type('UIAccessibilityBackButtonElement')),
          ),
      );
    },
    Button(label) {
      return element(by.label(label).and(by.traits(['button'])));
    },
    ClickableLabel(label) {
      return element(
        by
          .type('UITableViewCellContentView')
          .withDescendant(by.label(label).and(by.traits([staticTextTrait]))),
      );
    },
    Header(label) {
      return element(by.label(label).and(by.traits(['header'])));
    },
    Image(label) {
      return element(by.label(label).and(by.traits([imageTrait])));
    },
    ImageAndId(label, theId) {
      return element(
        by.label(label).and(by.traits([imageTrait]).and(by.id(theId))),
      );
    },
    SwipeButton(label) {
      return element(
        by
          .label(label)
          .and(
            by.traits([buttonTrait]).and(by.type('UISwipeActionStandardButton')),
          ),
      );
    },
    SwitchButton(label) {
      return element(
        by.type('UISwitch').and(by.label(label).and(by.traits(['button']))),
      );
    },
    TextLabel(label) {
      return element(by.label(label).and(by.traits([staticTextTrait])));
    },
    PickerItem(itemID) {
      return element(
        by.type('UIPickerTableViewWrapperCell').withDescendant(by.id(itemID)),
      );
    },
    PickerLabel(itemID) {
      return element(
        by.type('UIPickerTableViewWrapperCell').withDescendant(by.label(itemID)),
      );
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
      return element(
        by
          .type('UILabel')
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('LoopUI.LoopCompletionHUDView')),
      );
    },
    /**
     * @summary returns elements that relate to pump battery info
     * 1st element has pump battery charge remaining e.g. `50%`
     *
     * @example await match.loop.BatteryLevelInfo()
     */
    BatteryLevelInfo() {
      return element(
        by
          .type('UILabel')
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('LoopKitUI.BatteryLevelHUDView')),
      );
    },
    /**
     * @summary returns elements that relate to pump reservoir info
     * 1st element has units remaining e.g. `200U`
     * 2nd element has time detail e.g. `8:21 AM`
     *
     * @example await match.loop.ReservoirVolumeInfo()
     */
    ReservoirVolumeInfo() {
      return element(
        by
          .type('UILabel')
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('LoopKitUI.ReservoirVolumeHUDView')),
      );
    },
    /**
     * @summary returns elements that relate to basal rate info
     * 1st element has time detail e.g. `8:21 AM`
     * 2nd element has the units e.g. `+0.0 U`
     *
     * @example await match.loop.BasalRateInfo()
     */
    BasalRateInfo() {
      return element(
        by
          .type('UILabel')
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('LoopUI.BasalRateHUDView')),
      );
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
      return element(
        by
          .type('UILabel')
          .and(by.traits([staticTextTrait]))
          .withAncestor(by.type('LoopUI.GlucoseHUDView')),
      );
    },
  },
  ByParent(childLabel, parentLabel) {
    return element(by.label(childLabel).withAncestor(by.label(parentLabel)));
  },
  Id(id) {
    return element(by.id(id));
  },
  Label(label) {
    return element(by.label(label));
  },
  Text(text, index) {
    return element(by.text(text)).atIndex(index);
  },
  TopScrollableView() {
    return element(by.type('UITableView')).atIndex(1);
  },
  Trait(trait) {
    return element(by.traits([trait]));
  },
  Type(elementType) {
    return element(by.type(elementType));
  },
  UIEditableTextField() {
    return element(by.type('LoopKitUI.PaddedTextField'));
  },
  UITextField() {
    return element(by.type('UITextField'));
  },
  async CanBeClicked(item) {
    const itemsAttributes = await item.getAttributes();
    if (itemsAttributes.elements) {
      for (let i = 0; i < itemsAttributes.elements.length; index++) {
        const elementMatch = itemsAttributes.elements[index];
        if (elementMatch.hittable && elementMatch.enabled) {
          return true;
        }
      }
    } else if (itemsAttributes.hittable && itemsAttributes.enabled) {
      return true;
    }
    console.log('no clickable element found');
    return false;
  },
};

module.exports = match;
