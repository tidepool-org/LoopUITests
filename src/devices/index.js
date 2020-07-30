const match = require('../match');

const { PumpSimulator } = require('./pumpSimulator');
const { CGMSimulator } = require('./cgmSimulator');

class Devices {
    constructor(language, header) {
        this.generalText = language.general;
        this.cgmSimulator = new CGMSimulator(language);
        this.pumpSimulator = new PumpSimulator(language);
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
    async OpenCGMScreen() {
        try {
            await match.accessible.ClickableLabel(this.generalText.Simulator).atIndex(1).tap();
        } catch (err) {
            await match.Label('CGM Status').tap();
        }
        return this.cgmSimulator;
    }
}

module.exports = {
    Devices
};
