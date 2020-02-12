const { setup, match, pump, cgm, carbs } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.launchLoop();
    });
    describe('menu', () => {
        it('has Add Meal option', async () => {
            await expect(match.accessibilityButton('Add Meal')).toExist();
        });
        it('has Bolus option', async () => {
            await expect(match.accessibilityButton('Bolus')).toExist();
        });
        it('has Settings option', async () => {
            await expect(match.accessibilityButton('Settings')).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await match.accessibilityButtonBarButton('Settings').tap();
        });
        it('has closed loop', async () => {
            await expect(match.accessibilityLabelText('Closed Loop')).toExist();
        });
        it('has issue report', async () => {
            await expect(match.accessibilityLabelText('Issue Report')).toExist();
        });
        it('has add pump', async () => {
            await expect(match.accessibilityLabelText('Add Pump')).toExist();
        });
        it('has add cgm', async () => {
            await expect(match.accessibilityLabelText('Add CGM')).toExist();
        });
        it('has correction range', async () => {
            await expect(match.accessibilityLabelText('Correction Range')).toExist();
        });
        it('has suspend threshold', async () => {
            await expect(match.accessibilityLabelText('Suspend Threshold')).toExist();
        });
        it('has basal rates', async () => {
            await expect(match.accessibilityLabelText('Basal Rates')).toExist();
        });
        it('has delivery limits', async () => {
            await expect(match.accessibilityLabelText('Delivery Limits')).toExist();
        });
        it('has insulin model', async () => {
            await expect(match.accessibilityLabelText('Insulin Model')).toExist();
        });
        it('swipe up settings screen', async () => {
            await element(by.text('Carb Ratios')).swipe('up', 'fast');
        });
        it('has carb ratios', async () => {
            await expect(match.accessibilityLabelText('Carb Ratios')).toExist()
        });
        it('has insulin sensitivities', async () => {
            await expect(match.accessibilityLabelText('Insulin Sensitivities')).toExist()
        });
        it('has add service', async () => {
            await expect(match.accessibilityLabelText('Add Service')).toExist()
        });
        afterAll(async () => {
            await match.accessibilityButtonBarButton('Done').tap();
        });
    });
    describe('charts', () => {
        it('has Active Carbohydrates section', async () => {
            await expect(match.accessibilityLabelText('Active Carbohydrates')).toExist();
        });
        it('has Active Insulin section', async () => {
            await expect(match.accessibilityLabelText('Active Insulin')).toExist();
        });
        it('has Insulin Delivery section', async () => {
            await expect(match.accessibilityLabelText('Insulin Delivery')).toExist();
        });
        it('has Glucose section', async () => {
            await expect(match.accessibilityLabelText('Glucose')).toExist();
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
                await pump.setSuspend('65');
            });
            it('set basal rates', async () => {
                await pump.setBasalRates('0.1');
            });
            it('set delivery limits', async () => {
                await pump.setDeliveryLimits('0.5', '10.0');
            });
            it('set insulin model', async () => {
                await pump.setInsulinModel(pump.insulinModel.RapidAdults);
            });
            it('set carb ratios', async () => {
                await pump.setCarbRatios('8');
            });
            it('set insulin sensitivites', async () => {
                await pump.setInsulinSensitivities('500');
            });
            it.skip('set correction range', async () => {
                //TODO: unable to set this as we can't easily find sepcific values
                await pump.setCorrectionRange2({ range: { min: '179', max: '180' } });
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

