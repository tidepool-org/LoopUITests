const { maxBolus } = require('./maxBolus.tests');
const { basalRateSchedule } = require('./basalRateSchedule.tests');
const { insulinSensitivitySchedule } = require('./insulinSensitivitySchedule.tests');
const { maxTempBasalRate } = require('./maxTempBasalRate.tests');
const { suspendThreshold } = require('./suspendThreshold.tests');
const { correctionRangeSchedule } = require('./correctionRangeSchedule.tests');
const { insulinCarbRatio } = require('./insulinCarbRatio.tests');

module.exports = {
    maxBolus,
    basalRateSchedule,
    insulinSensitivitySchedule,
    maxTempBasalRate,
    correctionRangeSchedule,
    suspendThreshold,
    insulinCarbRatio
};
