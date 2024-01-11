/* eslint-disable no-undef */
const detox = require('detox');
const match = require('../match');
const action = require('../action');

async function _sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function _deviceInfo() {
  let deviceName = device.name;
  if (deviceName.includes('iPhone SE')) {
    return {
      smallScreen: true,
      useFaceID: false,
    };
  }
  return {
    smallScreen: false,
    useFaceID: true,
  };
}

class Screen {
  /**
   * @param {object} parentScreen
   * @param {object} parentScreen.screenText
   * @param {object} parentScreen.generalText
   *
   * @param {object} parentScreen.open
   * @param {string} parentScreen.open.label
   * @param {boolean} parentScreen.open.isBtn
   *
   * @param {object} parentScreen.header optional
   * @param {boolean} parentScreen.header.editable optional
   * @param {string} parentScreen.header.backLabel optional
   */
  constructor(parentScreen) {
    this.screenText = parentScreen.screenText;
    this.generalText = parentScreen.generalText;
    this.isEditable = false;

    if (parentScreen.open) {
      if (parentScreen.open.isBtn) {
        this.openBtn = parentScreen.open.label;
      } else {
        this.openLabel = parentScreen.open.label;
      }
    }
    if (parentScreen.header) {
      if (parentScreen.header.editable) {
        this.isEditable = parentScreen.header.editable;
      }
      this.backLabel = parentScreen.header.backLabel;
    }
    this._deviceInfo = _deviceInfo();
  }

  get Header() {
    return match.Label(this.screenText.Header);
  }

  get BackButton() {
    return match.accessible.BackButton(this.backLabel);
  }

  get OpenButton() {
    if (this.openBtn) {
      return match.accessible.Button(this.openBtn);
    }
    return match.Label(this.openLabel);
  }

  async Authenticate() {
    if (this._deviceInfo.useFaceID) {
      await device.matchFace();
    } else {
      await device.matchFinger();
    }
    // HACK: the match can take some time so we need to wait
    await _sleep(5000);
  }

  async IsOn(buttonElement) {
    try {
      await expect(buttonElement).toHaveValue('0');
      return false;
    } catch (err) {
      return true;
    }
  }

  async IsButtonOn(buttonElement) {
    return this.IsOn(buttonElement);
    // const buttonAttributes = await buttonElement.getAttributes();
    // return buttonAttributes.value == 1;
  }

  async SwipeUpUntilVisible(labelToSee) {
    await action.SwipeUpUntilVisible(labelToSee);
  }

  async SwipeDownUntilVisible(labelToSee) {
    await action.SwipeDownUntilVisible(labelToSee);
  }

  async CloseModal() {
    await action.SwipeDown();
  }

  async DismissAlert(label) {
    await this.Alert(label).tap();
  }

  Alert(buttonText) {
    return match.accessible.Button(buttonText);
  }
}

module.exports = {
  Screen,
};
