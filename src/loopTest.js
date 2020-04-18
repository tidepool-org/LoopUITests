
var Target = {
    tidepool: 'tidepool',
    diy: 'diy',
};

var Unit = {
    mmoll: 'mmol/L',
    mgdl: 'mg/dL',
};

var ScreenName = {
    settings: 'settings',
    home: 'home',
    bolus: 'bolus',
    carbEntry: 'carbEntry',
};

class LoopTest {
    constructor(build) {
        this.target = build.target;
        this.language = build.language;
        this.scenario = build.scenario;
        this.startScreen = build.startScreen;
        this.units = build.units;
        this.settings = build.settings;
        this.simulators = build.simulators;
    }
    static get Builder() {
        class Builder {
            constructor(target) {
                this.target = target;
            }
            withLanguage(language) {
                this.language = language;
                return this;
            }
            withScenario(scenario) {
                this.scenario = scenario;
                return this;
            }
            withStartScreen(startScreen) {
                this.startScreen = startScreen;
                return this;
            }
            withUnits(units) {
                this.units = units;
                return this;
            }
            withSettings(settings) {
                this.settings = settings;
                return this;
            }
            withSimulators(simulators) {
                this.simulators = simulators;
            }
            build() {
                return new LoopTest(this);
            }
        }
        return Builder;
    }
}
// We can call build unto our newly constructed builder object ...
let tpBuilder = new LoopTest.Builder(Target.tidepool);
let loop = tpBuilder.build();
// ... or pass in the builder object as an argument to Raptor.
// Your call.
let raptorBuilder2 = new Raptor.Builder('3998A-D');
let raptor2 = new Raptor(raptorBuilder2);
