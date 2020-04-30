const { Test } = require('../../src/index');

describe('open simulator', () => {
    var test = new Test();
    it('prepare test', async () => {
        await test.prepare();
    });
});
