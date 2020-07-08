const { GlucoseScreen } = require('./glucoseScreen');
const { ActiveInsulinScreen } = require('./activeInsulinScreen');
const { InsulinDeliveryScreen } = require('./insulinDeliveryScreen');
const { ActiveCarbohydratesScreen } = require('./activeCarbohydratesScreen');
const { Header } = require('./header');

var home = {
    GlucoseScreen,
    ActiveInsulinScreen,
    InsulinDeliveryScreen,
    ActiveCarbohydratesScreen,
    Header,
};

module.exports = {
    home,
};
