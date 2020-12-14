const deliveryLimitsTest = require('./deliveryLimits.tests');
const basalRateScheduleTest = require('./basalRateSchedule.tests');
const insulinSensitivityScheduleTest = require('./insulinSensitivitySchedule.tests');
const glucoseSafetyLimitTest = require('./glucoseSafetyLimit.tests');
const correctionRangeScheduleTest = require('./correctionRangeSchedule.tests');
const insulinCarbRatioTest = require('./insulinCarbRatio.tests');

module.exports = {
    deliveryLimitsTest,
    basalRateScheduleTest,
    insulinSensitivityScheduleTest,
    correctionRangeScheduleTest,
    glucoseSafetyLimitTest,
    insulinCarbRatioTest
};
