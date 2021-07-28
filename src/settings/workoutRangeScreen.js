const base = require('../base/index');

class WorkoutRangeScreen extends base.EntriesScreen {
  constructor(language, config) {
    super(
      {
        screenText: language.screenText,
        generalText: language.generalText,
        header: {
          backLabel: language.backLabel,
        },
        open: {
          isBtn: false,
          label: language.screenText.Header,
        },
      },
      config,
    );
  }
}

module.exports = {
  Screen: WorkoutRangeScreen,
};
