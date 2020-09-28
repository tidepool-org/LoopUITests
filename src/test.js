const HomeScreen = require('./home/index');
const exec = require('child_process').exec;
const match = require('./match');
const { screenName } = require('./properties');
const LoopUtilities = require('./loopUtilities');

class Test {
    /**
     * @summary test setup configuration
     * @param {object} setup
     * @param {object} setup.language required
     * @param {object} setup.screenDefaults required
     *
     * @param {object} setup.limits optional
     * @param {object} setup.scenario optional
     * @param {object} setup.settingDefault optional
     * @param {boolean} setup.enableTherapySettings optional
     *
     * @param {object} setup.authentication optional
     * @param {boolean} setup.authentication.faceid
     * @param {boolean} setup.authentication.fingerid
     *
     * @param {object} setup.simulators optional
     * @param {boolean} setup.simulators.cgm
     * @param {boolean} setup.simulators.pump
     *
     * @param {boolean} setup.enableClosedLoop optional
     *
     * @param {object} setup.cgmData optional
     * @param {object} setup.cgmData.model
     * @param {atring} setup.cgmData.model.name
     * @param {array} setup.cgmData.model.bgValues
     * @param {object} setup.cgmData.frequency
     * @param {boolean} setup.cgmData.frequency.seconds
     * @param {boolean} setup.cgmData.frequency.minutes
     * @param {object} setup.cgmData.history
     * @param {string} setup.cgmData.history.name
     * @param {number} setup.cgmData.history.backfillHours
     */
    setup(setup) {
        this.language = setup.language;
        this.screenDefaults = setup.screenDefaults;
        this.limits = setup.limits;
        this.scenario = setup.scenario;
        this.settingDefault = setup.settingDefault;
        this.therapySettings = setup.enableTherapySettings;
        this.authenticate = setup.authentication;
        this.simulators = setup.simulators;
        this.closedLoop = setup.enableClosedLoop;
        this.cgmData = setup.cgmData;
        this.startScreen = screenName.home;
        return this;
    }
    async _setupCGMData() {
        if (this.cgmData) {
            let cgmScreen = await this.OpenCGMScreen();
            await cgmScreen.Apply(this.cgmData);
        }
    }
    // async _loadDeviceScenariosFromDisk(deviceId) {
    //     const _loadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
    //     _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
    //         return null;
    //     });
    //     _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
    //         throw Error(data);
    //     });
    // }
    // async _loadScenario() {
    //     if (this.scenario) {
    //         await this._loadDeviceScenariosFromDisk(device.id);
    //         await device.shake();
    //         await expect(match.accessible.TextLabel(this.scenario)).toExist();
    //         await match.accessible.TextLabel(this.scenario).tap();
    //         await match.accessible.ButtonBarButton('Load').tap();
    //     }
    // }
    async _setStartScreen() {
        if (this.startScreen) {
            switch (this.startScreen) {
                case screenName.settings:
                    await this.OpenSettingsScreen();
                    break;
                case screenName.bolus:
                    await this.OpenBolusScreen();
                    break;
                case screenName.carbEntry:
                    await this.OpenCarbEntryScreen();
                    break;
                default:
                    break;
            }
        }
    }
    async _launchLoop() {
        var loopAppPermissions = { notifications: 'YES', health: 'YES' };
        var biometricEnrollment = false;
        if (this.authenticate) {
            biometricEnrollment = true;
            if (this.authenticate.fingerid) {
                loopAppPermissions.fingerid = 'YES';
            } else {
                loopAppPermissions.faceid = 'YES';
            }
        }
        await device.launchApp({
            newInstance: true,
            permissions: loopAppPermissions,
        });
        await device.setBiometricEnrollment(biometricEnrollment);
    }
    _filterSettings(values, types) {
        const filtered = values;
        if (types) {
            for (const type of types) {
                delete filtered[type];
            }
        }
        return filtered;
    }

    async prepare() {
        if (!this.language) {
            throw 'language is required!';
        }
        if (!this.screenDefaults) {
            throw 'screenDefaults are required!';
        }
        this.homeScreen = new HomeScreen(this.language, this.screenDefaults);
        this.loopUtilities = new LoopUtilities(this);
        await this._launchLoop();
        if (this.therapySettings) {
            await this.LoopUtilities().loadTherapySettings();
        }
        await this._setSimulators();
        if (this.scenario) {
            await this.LoopUtilities().loadScenario(this.scenario);
        }
        await this._setupCGMData();
        await this._setLoopMode();
        await this._setStartScreen();

    }
    async _setLoopMode() {
        if (this.closedLoop) {
            await this.LoopUtilities().closeLoop();
        }
    }
    async _setSimulators() {
        if (this.simulators) {
            if (this.simulators.cgm) {
                await this.LoopUtilities().addCGM();
            }
            if (this.simulators.pump) {
                await this.LoopUtilities().addUnconfiguredPump();
            }
        }
    }
    // async advanceScenario(cycles) {
    //     await device.shake();
    //     await expect(match.accessible.TextLabel(this.scenario)).toExist();
    //     await match.accessible.TextLabel(this.scenario).swipe('left');
    //     await match.accessible.SwipeButton('Advance ⏭').tap();
    //     await match.UITextField().typeText(cycles);
    //     await match.accessible.Button(this.language.general.OK).tap();
    // }
    /**
     * @summary will load the mocked therapy settings
     */
    // async addConfiguredPump() {
    //     await this.useCases.addConfiguredPump();
    //     // await this.addUnconfiguredPump();
    //     // await this.loadTherapySettings(true);
    // }
    // async addUnconfiguredPump() {
    //     await this.useCases.addConfiguredPump();
    //     // await this.homeScreen.HeaderSection().Devices().AddPump();
    // }
    // async addCGM() {
    //     await this.useCases.addCGM();
    //     //await this.homeScreen.HeaderSection().Devices().AddCGM();
    // }
    // async loadTherapySettings(load) {
    //     if (load) {
    //         await device.shake();
    //         await match.accessible.TextLabel('Mock Therapy Settings').tap();
    //     }
    // }
    LoopUtilities() {
        return this.loopUtilities;
    }
    async OpenPumpScreen() {
        var screen = await this.homeScreen.HeaderSection().Devices().OpenPumpScreen();
        return screen;
    }
    async OpenCGMScreen() {
        var screen = await this.homeScreen.HeaderSection().Devices().OpenCGMScreen();
        return screen;
    }
    async OpenSettingsScreen() {
        this.settingsOpen = true;
        return this.homeScreen.OpenSettingsScreen();
    }
    async OpenTherapySettingsScreen() {
        var settings = await this.OpenSettingsScreen();
        return settings.OpenTherapySettings();
    }
    async OpenCarbEntryScreen() {
        return this.homeScreen.OpenCarbEntryScreen();
    }
    async OpenBolusScreen() {
        return this.homeScreen.OpenBolusScreen();
    }
    async OpenBolusScreen() {
        return this.homeScreen.OpenBolusScreen();
    }
    async OpenCustomPresetScreen() {
        return this.homeScreen.OpenCustomPresetScreen();
    }
    async OpenHomeScreen() {
        return this.homeScreen;
    }
}

module.exports = {
    Test
};
