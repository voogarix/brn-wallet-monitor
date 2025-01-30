const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, 'src/renderer')
    ];
    return config;
  }
};
