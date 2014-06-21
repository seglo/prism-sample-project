// myConf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['e2e_spec/*.js'],
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    showColors: true,
    includeStackTrace: true
  }
};