/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath:'build/Build/Products/Debug-iphonesimulator/Loop.app',
      build: '',
    }
  },
  devices: {
    'ios.simulator.iphone-15-pro': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15'
      }
    },
    'ios.simulator.iphone-se-3': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone SE (3rd generation)'
      }
    },
  },
  configurations: {
    'ios.sim.debug.iphone-15-pro': {
        device: 'ios.simulator.iphone-15-pro',
        app: 'ios.debug'
      },
      'ios.sim.debug.iphone-se-3': {
        device: 'ios.simulator.iphone-se-3',
        app: 'ios.debug'
      }
  }
};
