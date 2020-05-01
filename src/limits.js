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
            warning: 70,
            limit: 60,
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
        step: 1,
        max: {
            limit: 180,
            warning: 120,
        },
        min: {
            warning: 70,
            limit: 54,
        },
    },
};

module.exports = {
    limits
};
