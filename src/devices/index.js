const match = require('../match');

const PumpSimulatorScreen = require('./pumpSimulatorScreen');
const CGMSimulatorScreen = require('./cgmSimulatorScreen');
const DexcomG6Screen = require('./dexcomG6Screen');

class Devices {
    constructor(language, header) {
        this.generalText = language.general;
        this.cgmSimulator = new CGMSimulatorScreen(language);
        this.pumpSimulator = new PumpSimulatorScreen(language);
        this.g6 = new DexcomG6Screen(language);
        if (header) {
            this.isHeader = true;
        }
    }
    AddPumpButton() {
        if (this.isHeader) {
            return match.accessible.TextLabel(this.generalText.AddPump);
        }
        return match.accessible.TextLabel('Add Pump\nTap here to set up a pump');
    }
    AddCGMButton() {
        if (this.isHeader) {
            return match.accessible.TextLabel(this.generalText.AddCGM);
        }
        return match.accessible.TextLabel('Add CGM\nTap here to set up a CGM');
    }
    async AddPump() {
        await this.AddPumpButton().tap();
        await match.accessible.Button(this.generalText.Simulator).tap();
        await match.accessible.Button(this.generalText.Continue).tap();
    }
    async OpenPumpScreen() {
        try {
            await match.accessible.Id(this.generalText.SimulatorPump).tap();
        } catch (err) {
            await match.Label('Pump Status').tap();
        }
        return this.pumpSimulator;
    }
    async AddCGM() {
        await this.AddCGMButton().tap();
        await match.accessible.Button(this.generalText.Simulator).tap();
    }
    async AddG6() {
        await this.AddCGMButton().tap();
        await match.accessible.Button('Dexcom G6').tap();
        return this.g6;
    }
    async OpenCGMScreen() {
        try {
            await match.accessible.ClickableLabel(this.generalText.Simulator).atIndex(1).tap();
        } catch (err) {
            await match.Label('CGM Status').tap();
        }
        return this.cgmSimulator;
    }
}

module.exports = Devices;
