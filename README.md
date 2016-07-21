#Modular PostCSS Boilerplate

A CSS boilerplate using a scalable, modular architecture complete with tooling, linting and style guide.

Add a PostCSS logo somewhere here for shinyness - see simple vars README

##Architecture

The architecture loosely follow's the principles of Harry Roberts' ITCSS. Specificity is kept as low/flat as possible throughout the codebase. BEM naming convention is utilised to help achieve this. While BEM helps us to understand the local relationship in a UI element (component), [namespace prefixes](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further) are
also utilised. These namespaces help us to understand the global relationship between components. The boilerplate includes the most commonly used utilities and objects. Utilities use responsive suffixes e.g. `.u-margin-left@xs`.

The compiled, minified, production-ready CSS file currently comes in at approximately 50kb.

A few demo UI elements are available here. The corresponding generated style guide is available here.

##Technology

Gulp is used for tooling. The following PostCSS plugins are used in the Gulp pipeline:

- [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars). Traditional pre-processor style CSS variables.
- [postcss-import](https://github.com/postcss/postcss-import). Allows us to break up our CSS into separate files and use '@import'.
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media). Shorthand media queries.
- [postcss-nested](https://github.com/postcss/postcss-nested). Traditional pre-processor style nesting.
- [postcss-mixins](https://github.com/postcss/postcss-mixins). Traditional pre-processor style mixins.
- [postcss-color-function](https://github.com/postcss/postcss-color-function). Some common methods to modify CSS colours on the fly.
- [postcss-calc](https://github.com/postcss/postcss-calc). Math calc() is done via JavaScript if possible rather than in client.
- [postcss-nano](https://github.com/ben-eb/cssnano). Used on production build. Groups a lot of optimisation plugins together e.g. minification, de-duping, removing comments etc
- [autoprefixer](https://github.com/postcss/autoprefixer). Adds vendor prefixes if necessary to CSS. Based on caniuse.com.

[Normalize.css](https://necolas.github.io/normalize.css/) is used to reset the CSS. [HTML5 Boilerplate](https://html5boilerplate.com) is used for the demo template.

[PureCSS](http://purecss.io) is used for the internal grid. This has been incorporated into the object `.o-grid`.

[Browsersync](https://www.browsersync.io) is utilised in the dev environment for live reloading.

##Style guide

A style guide is automatically generated during the build. The PostCSS plugin [postcss-style-guide](https://github.com/morishitter/postcss-style-guide) is utilised. This plugin parses CSS comments to generate it's content.

##Linting

CSS is linted using the PostCSS plugin [stylelint](http://stylelint.io). It's similar to the more commonly used JavaScript linter [ESLint](http://eslint.org). Configuration is located in `.stylelintrc`. The boilerplate has such linting rules as: blocking ID and type selectors, maximum specificity and various syntax conventions. Disabling/enabling stylelint is easy enough and examples can be found in the code where this is necessary.

##Gulp commands

Build a production ready, minified CSS file in `/build/css/main.css`:
```
gulp prod
```
Startup a development environment using Browsersync:
```
gulp dev
```
Startup a development environment for style guide using Browsersync:
```
gulp dev-styleguide
```
