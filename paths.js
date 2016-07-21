var path = require('path');

module.exports = {
	source: path.join(__dirname, 'source'),
  sourceCSS: path.join(__dirname, 'source/css'),
	build: path.join(__dirname, 'build'),
  buildCSS: path.join(__dirname, 'build/css'),
	buildStyleGuide: path.join(__dirname, 'build/styleguide')
};
