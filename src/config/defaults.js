var mgdL = {
    insulinSensitivity: {
        start: 500
    },
    correctionRange: {
        maxStart: 120,
        minStart: 100
    },
    suspendThreshold: {
        start: 80
    },
    carbRatio: {
        startWhole: 150,
        startDecimal: 0
    },
    basalRate: {
        startWhole: 0,
        startDecimal: '00'
    },
    deliveryLimit: {
        basalRate: {
            startWhole: 35,
            startDecimal: '00'
        },
        bolus: {
            startWhole: 19,
            startDecimal: '00'
        }
    }
};

module.exports = {
    mgdL
};



