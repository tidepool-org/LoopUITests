
const basalRatesUnits = 'U/hr';
const insulinSensitivitiesUnits = 'mg/dL/U';
const correctionRangesMaximum = 180;

const units = {
    mgdL: 'mg/dL',
    mmolL: 'mmol/L',
};

var config = {
    basalRatesUnits,
    insulinSensitivitiesUnits,
    correctionRangesMaximum
};

module.exports = config;
