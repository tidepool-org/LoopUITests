class LoopTestBuilder {
    constructor(target) {
        this.target = target;
    }
    setLanguage(language) {
        this.language = language;
        return this;
    }
    setStartScreen(name) {
        this.startScreen = name;
        return this;
    }
    setScenario(name) {
        this.scenario = name;
        return this;
    }
    setSettings(settings) {
        this.settings = settings;
        return this;
    }
    build() {
        if (!('target' in this)) {
            throw new Error('target is missing, must be either tidepool or DIY')
        }
        return new LoopTest(this.target, this.weight, this.height, this.gender)
    }
}
