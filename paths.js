var path = require('path');

module.exports = {
	source: path.join(__dirname, 'source'),
  sourceCSS: path.join(__dirname, 'source/css'),
	sourceIcons: path.join(__dirname, 'node_modules/open-iconic/svg'),
	build: path.join(__dirname, 'build'),
  buildCSS: path.join(__dirname, 'build/css'),
	buildIcons: path.join(__dirname, 'build/images/icons'),
	buildStyleGuide: path.join(__dirname, 'build/styleguide')
};
