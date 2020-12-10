const insulinDeliveryScreen = require("./insulinDeliveryScreen").tests;
const activeCarbohydratesScreen = require("./activeCarbohydratesScreen").tests;
const activeInsulinScreen = require("./activeInsulinScreen").tests;
const statusScreen = require("./index").tests;

module.exports = {
  statusScreen,
  activeInsulinScreen,
  activeCarbohydratesScreen,
  insulinDeliveryScreen,
};
