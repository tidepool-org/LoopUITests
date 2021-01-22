const basalRatesScreen = require('./basalRatesScreen').tests;
const carbRatioScreen = require('./carbRatioScreen').tests;
const correctionRangeScreen = require('./correctionRangeScreen').tests;
const deliveryLimitsScreen = require('./deliveryLimitsScreen').tests;
const insulinModelScreen = require('./insulinModelScreen').tests;
const insulinSensitivitiesScreen = require('./insulinSensitivitiesScreen')
  .tests;
const premealRangeScreen = require('./premealRangeScreen').tests;
const glucoseSafetyLimitScreen = require('./glucoseSafetyLimitScreen').tests;
const workoutRangeScreen = require('./workoutRangeScreen').tests;

module.exports = {
  basalRatesScreen,
  carbRatioScreen,
  correctionRangeScreen,
  deliveryLimitsScreen,
  insulinModelScreen,
  insulinSensitivitiesScreen,
  premealRangeScreen,
  glucoseSafetyLimitScreen,
  workoutRangeScreen,
};
