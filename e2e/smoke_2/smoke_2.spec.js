const { Test, Config } = require("../../src/index");
const bolusScreenTests = require("../../src/bolus").tests;
const insulinDeliveryScreenTests = require("../../src/status/insulinDeliveryScreen")
  .tests;
const activeCarbohydratesScreenTests = require("../../src/status/activeCarbohydratesScreen")
  .tests;
const activeInsulinScreenTests = require("../../src/status/activeInsulinScreen")
  .tests;
const statusScreenTests = require("../../src/status/index").tests;

describe("accessibility", () => {
  var test = new Test();
  var config = new Config();
  it("prepare test", async () => {
    config = await config.prepare();
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      enableTherapySettings: true,
    });
    await test.prepare();
  });
  statusScreenTests({
    app: test,
  });
  bolusScreenTests({
    name:"Simple Bolus Calculator Screen",
    app: test,
    closedLoop: false,
    bolusForMeal: false,
  });
  bolusScreenTests({
    name:"Simple Meal Bolus Calculator Screen",
    app: test,
    closedLoop: false,
    bolusForMeal: true,
  });
  insulinDeliveryScreenTests({
    app: test,
  });
  activeCarbohydratesScreenTests({
    app: test,
  });
  activeInsulinScreenTests({
    app: test,
  });
});
