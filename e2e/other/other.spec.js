const { Test, } = require('../../src/index');
const { smokeTests } = require('../../tests/smoke/index');

describe('other test', () => {
    var test = new Test();
    it('setup test', async () => {
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            smokeTests.homeScreenAccessibilityTests(test);
        });
    });
});
