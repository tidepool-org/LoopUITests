const match = require('./match');
const element = require('detox').element;

var _nextPickerStep = function (currentValue, expectedValue, smallStep) {
    let step = 1;
    if (smallStep == false) {
        if (Math.abs(currentValue - expectedValue) >= 2) {
            step = 2;
        }
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
     * @summary scroll the picker to the given `expectedValue`
     */
    async ScrollPickerToValue(currentValue, expectedValue) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue, false);
            //NOTE: the tree expands when you traverse through a picker. This works but is hideous!!
            try {
                await match.accessible.PickerItem_v2(1, `${currentValue}`).tap();
            } catch (error) {
                try {
                    await match.accessible.PickerItem_v2(0, `${currentValue}`).tap();
                } catch (error) {
                    await match.accessible.PickerItem_v2(2, `${currentValue}`).tap();
                }
            }
        } while (currentValue != expectedValue);
    },
    /**
     *
     * @param {string} currentValue
     * @param {string} expectedValue
     * @param {object} config
     * @param {string} config.pickerID
     * @param {boolean} config.useItemID
     * @param {boolean} config.smallStep
     */
    async ScrollQuantityPicker(currentValue, expectedValue, config) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue, config.smallStep);
            if (config.useItemID) {
                await match.accessible.PickerItem(`${currentValue}`).atIndex(1).tap();
            } else {
                await match.accessible.QuantityPickerItemLabel(
                    `${currentValue}`,
                    config.pickerID,
                ).tap();
            }
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
    async SwipePickerUp(times) {
        let count = 1;
        do {
            await match.accessible.Picker().swipe('up');
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
    async SwipeUp() {
        await match.ScrollableView().atIndex(1).swipe('up', 'fast', 0.2);
    },
    async SwipeDown() {
        await match.ScrollableView().atIndex(1).swipe('down', 'fast', 0.2);
    },
    async ScrollToTop() {
        await match.ScrollableView().atIndex(1).swipe('down');
    },
};

module.exports = action;
