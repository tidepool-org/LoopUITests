
const basalRatesUnits = 'U/hr';
const basalRatesUnitsPerHourStepSize = 0.05;
const insulinSensitivitiesUnits = 'mg/dL/U';
const insulinSensitivitiesMaximum = 500;
const correctionRangesMaximum = 180;

var config = {
    basalRatesUnits,
    basalRatesUnitsPerHourStepSize,
    insulinSensitivitiesUnits,
    insulinSensitivitiesMaximum,
    correctionRangesMaximum
};

module.exports = config;
