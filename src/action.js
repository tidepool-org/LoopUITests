/* eslint-disable no-undef */
const match = require('./match');
const element = require('detox').element;

var _nextPickerStep = function (currentValue, expectedValue) {
    let current = Number(currentValue);
    let expected = Number(expectedValue);
    let step = 1;
    if (Math.abs(current - expected) >= 2) {
        step = 2;
    }
    if (current > expected) {
        return current - step;
    } else if (current < expected) {
        return current + step;
    }
    return current;
}

var _swipeUntilVisible = async function (desiredLabel, direction) {
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
            await match.TopScrollableView().swipe(direction, 'slow', 0.2);
            ++timesSwiped;
        }
    }
    while (!labelVisible);
}

const action = {
    /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {boolean} isMinValue, optional - default is true
     */
    async ScrollMaxMinPicker(currentValue, expectedValue, isMinValue = true) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue);
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
        while (currentValue != expectedValue);
    },
    /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {boolean} isWholePart, optional - default is true
     */
    async ScrollDecimalPicker(currentValue, expectedValue, isWholePart = true) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue);

            if (isWholePart) {
                try {
                    await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
                } catch (err) {
                    console.log('## FAILED currentValue:', currentValue, ' expectedValue:', expectedValue);
                }
            }
        }
        while (currentValue != expectedValue);
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
};

module.exports = action;
