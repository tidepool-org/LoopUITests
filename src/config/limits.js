var mgdL = {
    correctionRange: {
        max: {
            limit: 180,
            warning: 121,
            noWarning: 120,
        },
        min: {
            noWarning: 100,
            warning: 69,
            limit: 60,
        },
    },
    insulinSensitivities: {
        max: {
            limit: 500,
            warning: 400,
            noWarning: 399,
        },
        min: {
            noWarning: 16,
            warning: 15,
            limit: 10,
        },
    },
    bolusDelivery: {
        step: 0.1,
        max: {
            limit: 30.0,
            warning: 20.0,
            noWarning: 19.0,
        },
        min: {
            limit: 0.0,
        },
    },
    basalDelivery: {
        step: 0.1,
        max: {
            limit: 35.0,
            noWarning: 34.0,
        },
        min: {
            limit: 0.0,
        },
    },
    basalRates: {
        max: {
            limit: 35.0,
            noWarning: 34.0,
        },
        min: {
            limit: 0.0,
            noWarning: 1.0,
        },
    },
    suspendThreshold: {
        max: {
            limit: 180,
            warning: 121,
            noWarning: 120,
        },
        min: {
            noWarning: 71,
            warning: 70,
            limit: 54,
        },
    },
    insulinCarbRatio: {
        max: {
            limit: 150.0,
            warning: 28.0,
            noWarning: 27.0,
        },
        min: {
            noWarning: 4.0,
            warning: 3.0,
            limit: 1.0,
        },
    }
};

module.exports = {
    mgdL
};
