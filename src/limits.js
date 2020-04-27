/**
 * @summary limits that are used when applying settings
 */
var limits = {
    correctionRange: {
        unitIncrement: 1,
        max: {
            maximum: 180,
            lowerBoundary: 120,
        },
        min: {
            minimum: 60,
            upperBoundary: 70,
        },
    },
    insulinSensitivities: {
        unitIncrement: 1,
        max: {
            maximum: 500,
            lowerBoundary: 400,
        },
        min: {
            minimum: 10,
            upperBoundary: 15,
        },
    },
    delivery: {
        bolus: {
            unitIncrement: 0.1,
            max: {
                maximum: 30.0,
                lowerBoundary: 20.0,
            },
            min: {
                minimum: 0.0,
            },
        },
        basal: {
            unitIncrement: 0.1,
            max: {
                maximum: 35,
            },
        },
    },
    basalRates: {
        unitIncrement: 0.05,
        max: {
            maximum: 35,
            lowerBoundary: 20.0,
        },
        min: {
            minimum: 0,
        },
    },
    suspendThreshold: {
        unitIncrement: 1,
        max: {
            maximum: 180,
            lowerBoundary: 120,
        },
        min: {
            minimum: 54,
            upperBoundary: 70,
        },
    },
};

module.exports = {
    limits
};
