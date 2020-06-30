const { GlucoseScreen } = require('./glucoseScreen');
const { ActiveInsulinScreen } = require('./activeInsulinScreen');
const { InsulinDeliveryScreen } = require('./insulinDeliveryScreen');
const { ActiveCarbohydratesScreen } = require('./activeCarbohydratesScreen');

var homeSubScreen = {
    GlucoseScreen,
    ActiveInsulinScreen,
    InsulinDeliveryScreen,
    ActiveCarbohydratesScreen,
};

module.exports = {
    homeSubScreen,
};
