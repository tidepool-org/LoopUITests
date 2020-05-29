const { maxBolusTests } = require('./maxBolus.tests');
const { basalRateScheduleTests } = require('./basalRateSchedule.tests');
const { insulinSensitivityScheduleTests } = require('./insulinSensitivitySchedule.tests');
const { maxTempBasalRateTests } = require('./maxTempBasalRate.tests');
const { suspendThresholdTests } = require('./suspendThreshold.tests');
const { correctionRangeScheduleTests } = require('./correctionRangeSchedule.tests');
const { insulinCarbRatioTests } = require('./insulinCarbRatio.tests');

var guardrailsTests = {
    maxBolusTests,
    basalRateScheduleTests,
    insulinSensitivityScheduleTests,
    maxTempBasalRateTests,
    correctionRangeScheduleTests,
    suspendThresholdTests,
    insulinCarbRatioTests
}

module.exports = {
    guardrailsTests,
};
