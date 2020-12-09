const { Test, Config } = require("../../src/index");
const bolusScreenTests = require("../../src/bolus").tests;
const accessibility = require("../../src/status/tests");

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
  accessibility.statusScreen({ app: test });
  accessibility.insulinDeliveryScreen({ app: test });
  accessibility.activeCarbohydratesScreen({ app: test });
  accessibility.activeInsulinScreen({ app: test });
});
