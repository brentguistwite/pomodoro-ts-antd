const webpackConfigTemplate = require('./webpack.config.defaults');
const path = require('path');

module.exports = env => {
  const template = webpackConfigTemplate({
    env,
    rootDir: __dirname,
  });

  const config = {
    ...template,
    // PUT OVERRIDES HERE.
    plugins: [...template.plugins],
  };
  config.devServer.headers = { 'Access-Control-Allow-Origin': '*' };
  // Add utils path.
  config.resolve.alias.ASSETS = path.resolve(__dirname, 'src/assets/');
  // Add components path.
  config.resolve.alias.COMPONENTS = path.resolve(__dirname, 'src/components/');
  return config;
};
