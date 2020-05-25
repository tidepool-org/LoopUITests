const match = require('./match');
const element = require('detox').element;
const { indexForTime } = require('./properties');



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

var _nextTimeStep = function (currentTime, expectedTime) {
    expectedTimeIndex = indexForTime(expectedTime);
    currentTimeIndex = indexForTime(currentTime);
    let step = 1;
    if (Math.abs(currentTimeIndex - expectedTimeIndex) >= 2) {
        step = 2;
    }
    if (currentTimeIndex > expectedTimeIndex) {
        return currentTimeIndex - step;
    } else if (currentTimeIndex < expectedValue) {
        return currentTimeIndex + step;
    }
    return currentTimeIndex;
}

const action = {
    async ScrollCorrectionRangePickers(range, current) {

        let currentMax = current;
        let expectedMax = range.max;
        let currentMin = range.max;
        let expectedMin = range.min;

        do {
            await match.accessible.PickerItem(1, `${currentMax}`).tap();
            currentMax--;
        } while (currentMax >= expectedMax);

        do {
            if (currentMin == expectedMax) {
                await match.accessible.PickerItem(4, `${currentMin}`).tap();
            } else if (currentMin == (expectedMax - 1)) {
                await match.accessible.PickerItem(2, `${currentMin}`).tap();
            } else {
                await match.accessible.PickerItem(1, `${currentMin}`).tap();
            }
            currentMin--;
        } while (currentMin >= expectedMin);
    },
    /**
     * @summary scroll the picker to the given `expectedValue`
     */
    async ScrollPickerToValue(currentValue, expectedValue) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue);
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
    async ScrollQuantityPicker(currentValue, expectedValue, id) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            currentValue = _nextPickerStep(currentValue, expectedValue);
            await match.accessible.QuantityPickerItem(`${currentValue}`, id).tap();
        } while (currentValue != expectedValue);
    },
    async ScrollTimePicker(currentTime, expectedTime, id) {
        // if (currentTime == expectedTime) {
        //     return;
        // }
        // do {
        //     currentTime = _nextTimeStep(currentTime, expectedTime);
        //     await match.accessible.QuantityPickerItem(`${currentTime}`, id).tap();
        // } while (currentTime != expectedTime);
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
            await match.accessible.Picker().swipe('up', 'fast', 0.5);
            count++;
        } while (count <= times);

    },
    async SwipeQuantityPickerUp(times, id) {
        let count = 1;
        do {
            await match.accessible.QuantityPicker(id).swipe('up', 'fast', 0.5);
            count++;
        } while (count <= times);

    },
    /**
     * @summary sets the pickers column to the given value
     */
    async SwipePickerDown(times) {
        let count = 1;
        do {
            await match.accessible.Picker().swipe('down', 'fast', 0.5);
            count++;
        } while (count <= times);
    },
    async SwipeQuantityPickerDown(times, id) {
        let count = 1;
        do {
            await match.accessible.QuantityPicker(id).swipe('down', 'fast', 0.5);
            count++;
        } while (count <= times);
    },
};

module.exports = action;
