const match = require('../match');

const PumpSimulatorScreen = require('./pumpSimulatorScreen');
const CGMSimulatorScreen = require('./cgmSimulatorScreen');
const DexcomG6Screen = require('./dexcomG6Screen');

class Devices {
    constructor(language, header) {
        this.generalText = language.general;
        this.screenText = language.device;
        this.cgmSimulator = new CGMSimulatorScreen(language);
        this.pumpSimulator = new PumpSimulatorScreen(language);
        this.g6 = new DexcomG6Screen(language);
        if (header) {
            this.isHeader = true;
        }
    }
    get AddPumpButton() {
        //if (this.isHeader) {
            //return match.accessible.TextLabel(this.screenText.AddPump);
            return match.accessible.TextLabel(this.screenText.AddPump);
        //}
        //return match.accessible.TextLabel(this.screenText.AddPumpFull);
    }
    get AddCGMButton() {
        //if (this.isHeader) {
            return match.accessible.TextLabel(this.screenText.AddCGM);
        // }
        // return match.accessible.TextLabel(this.screenText.AddCGMFull);
    }
    async AddPump() {
        await this.AddPumpButton.tap();
        await match.accessible.Button(this.screenText.PumpSimulator).tap();
        await match.accessible.Button(this.generalText.Continue).tap();
    }
    async OpenPumpScreen() {
        try {
            await match.accessible.Id(this.screenText.PumpSimulatorId).tap();
        } catch (err) {
            await match.Label(this.screenText.PumpStatus).tap();
        }
        return this.pumpSimulator;
    }
    async AddCGM() {
        await this.AddCGMButton.tap();
        await match.accessible.Button(this.screenText.CGMSimulator).tap();
    }
    async AddG6() {
        await this.AddCGMButton.tap();
        await match.accessible.Button(this.screenText.G6).tap();
        return this.g6;
    }
    async OpenCGMScreen() {
        try {
            await match.accessible.ClickableLabel(this.screenText.Simulator).atIndex(1).tap();
        } catch (err) {
            await match.Label(this.screenText.CGMStatus).tap();
        }
        return this.cgmSimulator;
    }
}

module.exports = Devices;
