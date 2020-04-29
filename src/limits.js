/**
 * @summary limits that are used when applying settings for guardrails
 */
var limits = {
    correctionRange: {
        step: 1,
        max: {
            limit: 180,
            warning: 120,
        },
        min: {
            limit: 60,
            warning: 70,
        },
    },
    insulinSensitivities: {
        step: 1,
        max: {
            limit: 500,
            warning: 400,
        },
        min: {
            limit: 10,
            warning: 15,
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
            limit: 35,
        },
    },
    basalRates: {
        step: 0.05,
        max: {
            limit: 35,
            warning: 20.0,
        },
        min: {
            limit: 0,
        },
    },
    suspendThreshold: {
        step: 1,
        max: {
            limit: 180,
            warning: 120,
        },
        min: {
            limit: 54,
            warning: 70,
        },
    },
};

module.exports = {
    limits
};
