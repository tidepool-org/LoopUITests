/**
 * @summary limits that are used when applying settings for guardrails
 */
var limits = {
    correctionRange: {
        max: {
            limit: 180,
            warning: 120,
            noWarning: 119,
        },
        min: {
            noWarning: 71,
            warning: 70,
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
        },
        min: {
            limit: 0.0,
        },
    },
    basalDelivery: {
        step: 0.1,
        max: {
            limit: 35.0,
        },
        min: {
            limit: 0.0,
        },
    },
    basalRates: {
        step: 0.05,
        max: {
            limit: 35.0,
            warning: 20.0,
        },
        min: {
            limit: 0.0,
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
        step: 1,
        max: {
            limit: 150,
            warning: 28,
        },
        min: {
            warning: 3,
            limit: 1,
        },
    }
};

module.exports = {
    limits
};
