const { maxBolusTests } = require('./max_bolus.tests');
const { basalRateScheduleTests } = require('./basal_rate_schedule.tests');
const { insulinSensitivityScheduleTests } = require('./insulin_sensitivity_schedule.tests');
const { maxTempBasalRateTests } = require('./max_temp_basal_rate.tests');
const { suspendThresholdTests } = require('./suspend_threshold.tests');
const { correctionRangeScheduleTests } = require('./correction_range_schedule.tests');
const { insulinCarbRatioTests } = require('./insulin_carb_ratio.tests');

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
