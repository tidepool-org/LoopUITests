const { setup, match, pump, cgm, carbs } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.launchLoop();
    });
    describe('menu', () => {
        it('has Add Meal option', async () => {
            await expect(match.accessible.Button('Add Meal')).toExist();
        });
        it('has Bolus option', async () => {
            await expect(match.accessible.Button('Bolus')).toExist();
        });
        it('has Settings option', async () => {
            await expect(match.accessible.Button('Settings')).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await match.accessible.ButtonBarButton('Settings').tap();
        });
        it('has closed loop', async () => {
            await expect(match.accessible.Label('Closed Loop')).toExist();
        });
        it('has issue report', async () => {
            await expect(match.accessible.Label('Issue Report')).toExist();
        });
        it('has add pump', async () => {
            await expect(match.accessible.Label('Add Pump')).toExist();
        });
        it('has add cgm', async () => {
            await expect(match.accessible.Label('Add CGM')).toExist();
        });
        it('has correction range', async () => {
            await expect(match.accessible.Label('Correction Range')).toExist();
        });
        it('has suspend threshold', async () => {
            await expect(match.accessible.Label('Suspend Threshold')).toExist();
        });
        it('has basal rates', async () => {
            await expect(match.accessible.Label('Basal Rates')).toExist();
        });
        it('has delivery limits', async () => {
            await expect(match.accessible.Label('Delivery Limits')).toExist();
        });
        it('has insulin model', async () => {
            await expect(match.accessible.Label('Insulin Model')).toExist();
        });
        it('swipe up settings screen', async () => {
            await element(by.text('Carb Ratios')).swipe('up', 'fast');
        });
        it('has carb ratios', async () => {
            await expect(match.accessible.Label('Carb Ratios')).toExist()
        });
        it('has insulin sensitivities', async () => {
            await expect(match.accessible.Label('Insulin Sensitivities')).toExist()
        });
        it('has add service', async () => {
            await expect(match.accessible.Label('Add Service')).toExist()
        });
        afterAll(async () => {
            await match.accessible.ButtonBarButton('Done').tap();
        });
    });
    describe('charts', () => {
        it('has Active Carbohydrates section', async () => {
            await expect(match.accessible.Label('Active Carbohydrates')).toExist();
        });
        it('has Active Insulin section', async () => {
            await expect(match.accessible.Label('Active Insulin')).toExist();
        });
        it('has Insulin Delivery section', async () => {
            await expect(match.accessible.Label('Insulin Delivery')).toExist();
        });
        it('has Glucose section', async () => {
            await expect(match.accessible.Label('Glucose')).toExist();
        });
    });
    describe('cgm', () => {
        it('can be added', async () => {
            await cgm.add();
        });
        it('can configure simulator model', async () => {
            await cgm.setModel(cgm.simulatorModel.Constant, ['114']);
        });
        it('can configure simulator effect', async () => {
            await cgm.setEffect(cgm.simulatorEffects.GlucoseNoise);
        });
        it('can remove data', async () => {
            await cgm.removeData();
        });
        it('can be removed', async () => {
            await cgm.remove();
        });
    });
    describe('pump', () => {
        it('can be added', async () => {
            await pump.add();
        });
        describe('settings', () => {
            it('set suspend threshold', async () => {
                await pump.settings.Suspend('65');
            });
            it('set basal rates', async () => {
                await pump.settings.BasalRates('0.1');
            });
            it('set delivery limits', async () => {
                await pump.settings.DeliveryLimits('0.5', '10.0');
            });
            it('set insulin model', async () => {
                await pump.settings.InsulinModel(pump.insulinModel.RapidAdults);
            });
            it('set carb ratios', async () => {
                await pump.settings.CarbRatios('8');
            });
            it('set insulin sensitivites', async () => {
                await pump.settings.InsulinSensitivities('500');
            });
            it.skip('set correction range', async () => {
                //TODO: unable to set this as we can't easily find sepcific values
                await pump.settings.CorrectionRange({ range: { min: '179', max: '180' } });
            });
        });
        describe.skip('deliver', () => {
            it('bolus', async () => {
                //unable at the moment to add bolus
                await pump.bolus('3.5');
                await device.takeScreenshot('deliver bolus');
            });
        });
        describe('cleanup', () => {
            it('can remove data', async () => {
                await pump.removeData();
            });
            it('can be removed', async () => {
                await pump.remove();
            });
        });
    });
    describe('carbs', () => {
        let carbsAmount = '40';
        it('can be added', async () => {
            await carbs.add(carbsAmount);
            await device.takeScreenshot(`${carbsAmount} g carbs added`);
        });
        it.skip('can be viewed in the Active Carbohydrates section', async () => {
            await carbs.check(carbsAmount);
        });
    });
});

