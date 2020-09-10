const match = require('./match');
const element = require('detox').element;

var _nextPickerStep = function (currentValue, expectedValue) {
    let step = 1;
    if (Math.abs(currentValue - expectedValue) >= 2) {
        step = 2;
    }
    if (currentValue > expectedValue) {
        return currentValue - step;
    } else if (currentValue < expectedValue) {
        return currentValue + step;
    }
    return currentValue;
}

const action = {
    /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     */
    async ScrollQuantityPicker(currentValue, expectedValue) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue);
            await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
        } while (currentValue != expectedValue);
    },
    /**
     * @summary sets the pickers column to the given value
     */
    async SetPickerValue(column, value) {
        const currentPicker = 0;
        return element(
            by.type('UIPickerView')
        ).atIndex(currentPicker).setColumnToValue(column, String(value))
    },
    /**
     * @summary sets the pickers column to the given value
     */
    async SwipePickerUp(times, index) {
        let count = 1;
        do {
            await match.accessible.Picker(index).swipe('up');
            count++;
        } while (count <= times);

    },
    async SwipeQuantityPickerUp(times, id) {
        let count = 1;
        do {
            await match.accessible.QuantityPicker(id).swipe('up');
            count++;
        } while (count <= times);

    },
    /**
     * @summary sets the pickers column to the given value
     */
    async SwipePickerDown(times) {
        let count = 1;
        do {
            await match.accessible.Picker().swipe('down');
            count++;
        } while (count <= times);
    },
    async SwipeQuantityPickerDown(times, id) {
        let count = 1;
        do {
            await match.accessible.QuantityPicker(id).swipe('down');
            count++;
        } while (count <= times);
    },
    async ScrollToBottom() {
        await match.ScrollableView().atIndex(1).swipe('up');
    },
    async SwipeUp(index) {
        if (index == null) {
            index = 1;
        }
        await match.ScrollableView().atIndex(index).swipe('up', 'slow', 0.4);
    },
    async SwipeDown() {
        await match.ScrollableView().atIndex(1).swipe('down', 'slow', 0.4);
    },
    async ScrollToTop() {
        await match.ScrollableView().atIndex(1).swipe('down');
    },
};

module.exports = action;
