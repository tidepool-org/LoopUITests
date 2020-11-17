const { Test, Config } = require("../../src/index");

const accessibility = require("../../src/settings/tests");

describe("accessibility", () => {
  var test = new Test();
  var config = new Config();
  it("prepare test", async () => {
    config = await config.prepare();
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      enableTherapySettings: true,
      simulators: { pump: true },
    });
    await test.prepare();
  });
  describe("Therapy Settings", () => {
    it("can open", async () => {
      let settingsScreen = await test.OpenSettingsScreen();
      await settingsScreen.OpenTherapySettings();
    });
    //NOTE: in order that they appear on the screen to minimise scrolling and time taken
    accessibility.suspendThresholdScreen({ app: test });
    accessibility.correctionRangeScreen({ app: test});
    accessibility.premealRangeScreen({ app: test });
    accessibility.workoutRangeScreen({ app: test });
    accessibility.carbRatioScreen({ app: test });
    accessibility.basalRatesScreen({ app: test });
    accessibility.deliveryLimitsScreen({ app: test });
    accessibility.insulinModelScreen({ app: test });
    accessibility.insulinSensitivitiesScreen({ app: test});
  });
});
