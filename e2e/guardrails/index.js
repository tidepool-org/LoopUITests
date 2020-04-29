const { maxBolus } = require('./max_bolus');
const { basalRateSchedules } = require('./basal_rate_schedules');
const { insulinSensitivities } = require('./insulin_sensitivities');
const { maxTempBasalRate } = require('./max_temp_basal_rate');
const { suspendThreshold } = require('./suspend_threshold');
const { correctionRange } = require('./correction_range');

var guardrailsTests = {
    maxBolus,
    basalRateSchedules,
    insulinSensitivities,
    maxTempBasalRate,
    correctionRange,
    suspendThreshold
}

module.exports = {
    guardrailsTests,
};
