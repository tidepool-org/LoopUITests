const deliveryLimitsTest = require('./deliveryLimits.tests');
const basalRateScheduleTest = require('./basalRateSchedule.tests');
const insulinSensitivityScheduleTest = require('./insulinSensitivitySchedule.tests');
const suspendThresholdTest = require('./suspendThreshold.tests');
const correctionRangeScheduleTest = require('./correctionRangeSchedule.tests');
const insulinCarbRatioTest = require('./insulinCarbRatio.tests');

module.exports = {
    deliveryLimitsTest,
    basalRateScheduleTest,
    insulinSensitivityScheduleTest,
    correctionRangeScheduleTest,
    suspendThresholdTest,
    insulinCarbRatioTest
};
