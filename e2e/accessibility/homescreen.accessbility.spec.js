/* eslint-disable jest/expect-expect */
const {
  launchLoop, prepareLoop, setLanguage, skipTidepoolOnboarding,
} = require('../../utilities/prepareTest');
const { HomeScreen } = require('../../screens/exportAllScreens');

describe('Home Screen Accessibility', () => {
  let setup;
  beforeAll(async () => {
    setup = {
      language: 'enUS',
      mockTherapySettings: true,
    };
  });
  it('prepares loop', async () => {
    await launchLoop();
    await skipTidepoolOnboarding(setup);
    await prepareLoop(setup);
  });
  describe('has HUD elements', () => {
    let homeScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
    });
    it('has a CGM pill', async () => {
      await expect(homeScreen.CGMPill).toBeVisible();
    });
    it('has a loop icon', async () => {
      // TODO
      await expect(homeScreen.ActiveInsulinChart).toBeVisible();
    });
    it('has a pump pill', async () => {
      await expect(homeScreen.PumpPill).toBeVisible();
    });
  });
  describe('displays charts', () => {
    let homeScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
    });
    it('has a glucose chart', async () => {
      await expect(homeScreen.GlucoseChart).toBeVisible();
    });
    it('has an active insulin chart', async () => {
      await expect(homeScreen.ActiveInsulinChart).toBeVisible();
    });
    it('has an Insulin Delivery chart', async () => {
      await expect(homeScreen.InsulinDeliveryChart).toBeVisible();
    });
    it('has an Active Carbohydrates chart', async () => {
      await expect(homeScreen.ActiveCarbohydratesChart).toBeVisible();
    });
  });
  describe('has bottom button bar elements', () => {
    let homeScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
    });
    it('has an add meal button', async () => {
      await expect(homeScreen.AddMealButton).toBeVisible();
    });
    it('has a pre-meal target button', async () => {
      await expect(homeScreen.PreMealTargetsButton).toBeVisible();
    });
    it('has a bolus button', async () => {
      await expect(homeScreen.ActiveInsulinChart).toBeVisible();
    });
    it('has a workout targets button', async () => {
      await expect(homeScreen.InsulinDeliveryChart).toBeVisible();
    });
    it('has an Active Carbohydrates chart', async () => {
      await expect(homeScreen.ActiveCarbohydratesChart).toBeVisible();
    });
  });
});
