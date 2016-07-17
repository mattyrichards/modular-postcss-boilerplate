#Modular CSS Boilerplate

Architecture:
Description of point of the boilerplate. What it is and what it achieves. Overview. Benefits + linting and styleguide already plugged in.
More details:
Scalable CSS solution suited to component based architectures. Uses principles of ITCSS i.e. low specificity throughout.
Objects, components and utilities (namespaced). Most common objects and utilities have been added as part of the boilerplate.
Utilities make use of Responsive suffixes
http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/
Naming conventions:
Namespaces & BEM (special rules for utilities)
Difference between objects and components i.e. objects are implementation agnostic (same link as above, I think...)

Technologies/dependencies used:

PostCSS
Tooling via Gulp (commands below)
HTML5 Boilerplate https://html5boilerplate.com/
Normalize.css https://necolas.github.io/normalize.css/

PureCSS grid - custom grid imported into codebase as o-grid.

Font Awesome - dependency. Fonts imported into build.

PostCSS plugins
List all postcss plugins/modules (correct terminology) and small description.
- postcss-custom-media
- postcss-import
- postcss-mixins
- postcss-nested
- postcss-simple-vars
- postcss-calc
- postcss-color-function

Production build:
- autoprefixer
- postcss-discard-comments (prod build)
- cssnano (prod build)

Maybe something about initial production size filesize after optimisation.

stylelint
Describe what this is i.e. another postcss plugin
Custom configuration part of the boilerplate.
+ postcss-reporter

Styleguide
postcss-style-guide plugin. Currently using the default theme (which is pretty ugly). A new custom theme is in development (watch this space).
