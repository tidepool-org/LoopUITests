//update based on therapy settings
var mgdL = {
    correctionRange: {
        max: {
            limit: 180,
            warning: 121,
            noWarning: 120,
        },
        min: {
            limit: 75,
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
    basalRates: {
        max: {
            limit: 5.0,
        },
        min: {
            limit: 0.0,
            noWarning: 1.0,
        },
    },
    suspendThreshold: {
        max: {
            limit: 80,
        },
        min: {
            noWarning: 71,
            warning: 55,
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
    },
    delivery: {
        basalRate: {
            max: {
                limit: 35.0,
                warning: 7.0,
                noWarning: 6.0,
            },
            min: {
                limit: 1.0,
            },
        },
        bolus: {
            max: {
                limit: 25.0,
                warning: 20.0,
                noWarning: 19.95,
            },
            min: {
                limit: 0.1,
            },
        }
    }
};

module.exports = {
    mgdL
};
