/* eslint-disable no-undef */
const element = require('detox').element;
const match = require('./match');

var _nextPickerStep = function (currentValue, expectedValue) {
  let current = Number(currentValue);
  let expected = Number(expectedValue);
  let step = 1;
  if (current > expected) {
    return current - step;
  } if (current < expected) {
    return current + step;
  }
  return current;
};

var _swipeUntilVisible = async function (desiredLabel, direction) {
  let labelVisible = false;
  let timesSwiped = 0;
  const maxSwipes = 15;
  do {
    if (timesSwiped >= maxSwipes) {
      throw new Error(`Swiped screen ${direction} maximum times, check setup as there may be an issue`);
    }
    try {
      await expect(desiredLabel).toBeVisible(100);
      labelVisible = true;
    } catch (err) {
      let topScrollableView = await match.TopScrollableView();
      await topScrollableView.swipe(direction, 'slow', 0.2);
      ++timesSwiped;
    }
  }
  while (!labelVisible);

  // Swipe up a little to account for home bar
  let topScrollableView = await match.TopScrollableView();
  await topScrollableView.swipe(direction, 'slow', 0.1);
};

const action = {
  /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {boolean} isMinValue, optional - default is true
     */
  async ScrollMaxMinPicker(currentValue, expectedValue, isMinValue = true) {
    let currValue = currentValue;
    if (currValue === expectedValue) {
      return;
    }
    do {
      currValue = _nextPickerStep(currValue, expectedValue);
      if (isMinValue) {
        try {
          await match.accessible.PickerItem(`${currValue}`).atIndex(1).tap();
        } catch (err) {
          await match.accessible.PickerItem(`${currValue}`).atIndex(2).tap();
        }
      } else {
        await match.accessible.PickerItem(`${currValue}`).atIndex(1).tap();
      }
    }
    while (currValue !== expectedValue);
  },
  /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {boolean} isWholePart, optional - default is true
     */
  async ScrollDecimalPicker(currentValue, expectedValue, isWholePart = true) {
    let currValue = currentValue;
    if (currValue === expectedValue) {
      return;
    }
    do {
      currValue = _nextPickerStep(currValue, expectedValue);

      if (isWholePart) {
        try {
          await match.accessible.PickerItem(`${currValue}`).atIndex(1).tap();
        } catch (err) {
          console.log('## FAILED currentValue:', currValue, ' expectedValue:', expectedValue);
        }
      }
    }
    while (currValue !== expectedValue);
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
  async SwipeUpUntilVisible(desiredLabel) {
    await _swipeUntilVisible(desiredLabel, 'up');
  },
  async SwipeDownUntilVisible(desiredLabel) {
    await _swipeUntilVisible(desiredLabel, 'down');
  },
  async SwipeDown() {
    let topScrollableView = await match.TopScrollableView();
    await topScrollableView.swipe('down', 'fast', 0.8);
  },
};

module.exports = action;
