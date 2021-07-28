const match = require('../match');
const base = require('../base/index');

class InsulinModelScreen extends base.EntryScreen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Back,
      },
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
    });
  }

  get BackButton() {
    return match.accessible.ButtonBarButton(this.backLabel);
  }

  async Apply(model) {
    if (model) {
      await match.accessible.ClickableLabel(model).tap();
    }
  }
}

module.exports = {
  Screen: InsulinModelScreen,
};
