// Example file. Copy this to your project. Change then names of the referenced files or comment
// them out. Convention is to name sass partials to start with an '_'
module.exports = {
  verbose: true, // Set to true to show diagnostic information

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used
  // by bootstrap mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

  // Use preBootstrapCustomizations to change $brand-primary. Ensure this
  // preBootstrapCustomizations does not depend on other bootstrap variables.
  preFoundationCustomizations: './_pre-foundation-customizations.scss',

  // Use bootstrapCustomizations to utilize other sass variables defined in
  // preBootstrapCustomizations or the _variables.scss file. This is useful to set one
  // customization value based on another value.
  foundationCustomizations: './_foundation-customizations.scss',

  mainSass: './_main.scss',

  // Default for the style loading
  styleLoader: 'style-loader!css-loader!sass-loader',
  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
  //     styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
  //
  // If you want expanded CSS
  //   styleLoader: ExtractTextPlugin.extract('style-loader',
  // 'css-loader!sass?outputStyle=expanded'),

  scripts: {
    'foundation.core': true, 
    'foundation.abide': true,
    'foundation.accordion': true,
    'foundation.accordionMenu': true,
    'foundation.drilldown': true,
    'foundation.dropdown': true,
    'foundation.dropdownMenu': true,
    'foundation.equalizer': true,
    'foundation.interchange': true,
    'foundation.magellan': true,
    'foundation.offcanvas': true,
    'foundation.orbit': true,
    'foundation.responsiveMenu': true,
    'foundation.responsiveToggle': true,
    'foundation.reveal': true,
    'foundation.slider': true,
    'foundation.sticky': true,
    'foundation.tabs': true,
    'foundation.toggler': true,
    'foundation.tooltip': true,
    'foundation.util.box': true,
    'foundation.util.keyboard': true,
    'foundation.util.mediaQuery': true,
    'foundation.util.motion': true,
    'foundation.util.nest': true,
    'foundation.util.timerAndImageLoader': true,
    'foundation.util.touch': true,
    'foundation.util.triggers': true
  },
  styles: {
    'grid/grid': true,
    'typography/typography': true,
    'forms/forms': true,
    'components/visibility': true,
    'components/float': true,
    'components/button': true,
    'components/button-group': true,
    'components/accordion-menu': true,
    'components/accordion': true,
    'components/badge': true,
    'components/breadcrumbs': true,
    'components/callout': true,
    'components/close-button': true,
    'components/drilldown': true,
    'components/dropdown-menu': true,
    'components/dropdown': true,
    'components/flex-video': true,
    'components/label': true,
    'components/media-object': true,
    'components/menu': true,
    'components/off-canvas': true,
    'components/orbit': true,
    'components/pagination': true,
    'components/progress-bar': true,
    'components/reveal': true,
    'components/slider': true,
    'components/sticky': true,
    'components/switch': true,
    'components/table': true,
    'components/tabs': true,
    'components/title-bar': true,
    'components/top-bar': true,
    'components/thumbnail': true,
    'components/tooltip': true
  }
};

