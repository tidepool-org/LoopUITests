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
    async ScrollMultiPickerToValue_legacy(currentValue, expectedValue, isMax) {
        if (currentValue == expectedValue) {
            return;
        }
        do {
            console.log(`currentValue: ${currentValue}, expectedValue: ${expectedValue}`);
            currentValue = _nextPickerStep(currentValue, expectedValue);
            console.log(`_nextPickerStep: ${currentValue}`);
            //NOTE: the tree expands when you traverse through a picker. This works but is hideous!!


            if (isMax == true) {

                await match.accessible.PickerItem_legacy(1, `${currentValue}`).tap();
                console.log('## set MAX 1:');
            } else {
                try {
                    await match.accessible.PickerItem_legacy(4, `${currentValue}`).tap();
                    console.log('## set 4:');
                } catch (error) {
                    // try {
                    //     await match.accessible.PickerItem_legacy(1, `${currentValue}`).tap();
                    //     console.log('## set 1:');
                    // } catch (error) {
                    await match.accessible.PickerItem_legacy(2, `${currentValue}`).tap();
                    console.log('## set 2:');
                    //}
                }
            }
        } while (currentValue != expectedValue);
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

};

module.exports = action;
