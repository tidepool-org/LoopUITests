/* eslint-disable no-undef */
const { element, device } = require('detox');
const { match } = require('./match');

const nextPickerStep = function (currentValue, expectedValue) {
  const current = Number(currentValue);
  const expected = Number(expectedValue);
  let step = 1;
  if (Math.abs(current - expected) >= 2) {
    step = 2;
  }
  if (current > expected) {
    return current - step;
  } if (current < expected) {
    return current + step;
  }
  return current;
};

const action = {
  async Authenticate() {
    const deviceName = device.name;
    if (deviceName.includes('iphone SE')) {
      return device.matchFinger();
    } else {
      return device.matchFace();
    }
  },

  async ScrollMaxMinPicker(currentValue, expectedValue, isMinValue = true) {
    if (currentValue === expectedValue) {
      return;
    }
    do {
      currentValue = nextPickerStep(currentValue, expectedValue);
      if (isMinValue) {
        try {
          await match.accessible.PickerItem(`${currentValue}`).atIndex(2).tap();
        } catch (err) {
          await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
        }
      } else {
        await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
      }
    }
    while (currentValue !== expectedValue);
  },
  /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {boolean} isWholePart, optional - default is true
     */
  async ScrollDecimalPicker(currentValue, expectedValue, isWholePart = true) {
    if (currentValue === expectedValue) {
      return;
    }
    do {
      currentValue = nextPickerStep(currentValue, expectedValue);

      if (isWholePart) {
        try {
          await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
        } catch (err) {
          console.log('## FAILED currentValue:', currentValue, ' expectedValue:', expectedValue);
        }
      }
    }
    while (currentValue !== expectedValue);
  },
  /**
     *
     * @param {string} expected
     */
  async SetDatePicker(expected) {
    await element(by.type('UIDatePickerContentView').and(by.label(expected))).tap();
  },
  /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     */
  async ScrollIntegerPicker(currentValue, expectedValue) {
    return this.ScrollDecimalPicker(currentValue, expectedValue, true);
  },
  async SwipeDown() {
    await match.TopScrollableView().swipe('down', 'fast', 0.8);
  },
  async scrollUntilVisible(desiredLabel, direction) {
    let labelVisible = false;
    let timesSwiped = 0;
    const maxSwipes = 15;
    do {
      if (timesSwiped >= maxSwipes) {
        throw `Swiped screen ${direction} maximum times, check setup as there may be an issue`;
      }
      try {
        await expect(desiredLabel).toBeVisible();
        labelVisible = true;
      } catch (err) {
        await element(by.type('UITableView')).atIndex(1).swipe(direction, 'slow', 0.2);
        ++timesSwiped;
      }
    }
    while (!labelVisible);
  },
  async waitForElementToBeVisible(label, timeout) {
    await waitFor(label).toBeVisible().withTimeout(timeout);
  },
  async waitForElementToBeNotVisible(label, timeout) {
    await waitFor(label).toBeNotVisible().withTimeout(timeout);
  },
};

module.exports = action;
