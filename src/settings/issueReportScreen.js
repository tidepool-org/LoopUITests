const base = require('../base/index');

class IssueReportScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.settingsScreen.IssueReportScreen,
      generalText: language.general,
      header: {
        backLabel: language.settingsScreen.Settings,
      },
      open: {
        isBtn: false,
        label: language.settingsScreen.IssueReportScreen.Header,
      },
    });
  }
}

module.exports = IssueReportScreen;
