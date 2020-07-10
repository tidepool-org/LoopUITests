const { deliveryLimits } = require('./deliveryLimits.tests');
const { basalRateSchedule } = require('./basalRateSchedule.tests');
const { insulinSensitivitySchedule } = require('./insulinSensitivitySchedule.tests');
const { suspendThreshold } = require('./suspendThreshold.tests');
const { correctionRangeSchedule } = require('./correctionRangeSchedule.tests');
const { insulinCarbRatio } = require('./insulinCarbRatio.tests');

module.exports = {
    deliveryLimits,
    basalRateSchedule,
    insulinSensitivitySchedule,
    correctionRangeSchedule,
    suspendThreshold,
    insulinCarbRatio
};
