var path = require('path');

module.exports = {
	source: path.join(__dirname, 'source'),
  sourceCSS: path.join(__dirname, 'source/css'),
	sourceFonts: path.join(__dirname, 'node_modules/font-awesome/fonts/**/*'),
	build: path.join(__dirname, 'build'),
  buildCSS: path.join(__dirname, 'build/css'),
	buildFonts: path.join(__dirname, 'build/fonts')
};
