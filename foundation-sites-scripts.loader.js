var scripts = [
  'foundation.core',
  'foundation.abide',
  'foundation.accordion',
  'foundation.accordionMenu',
  'foundation.drilldown',
  'foundation.dropdown',
  'foundation.dropdownMenu',
  'foundation.equalizer',
  'foundation.interchange',
  'foundation.magellan',
  'foundation.offcanvas',
  'foundation.orbit',
  'foundation.responsiveMenu',
  'foundation.responsiveToggle',
  'foundation.reveal',
  'foundation.slider',
  'foundation.sticky',
  'foundation.tabs',
  'foundation.toggler',
  'foundation.tooltip',
  'foundation.util.box',
  'foundation.util.keyboard',
  'foundation.util.mediaQuery',
  'foundation.util.motion',
  'foundation.util.nest',
  'foundation.util.timerAndImageLoader',
  'foundation.util.touch',
  'foundation.util.triggers'
];

var foundationSitesPath = require('./foundationSitesPath');
var path = require('path');

module.exports = function() {
};


// Create a list of require('path/to/foundation.js');
module.exports.pitch = function(configPath) {
  var pathToFoundationSites = foundationSitesPath.getPath(this.context);
  var config = require(configPath);
  this.cacheable(true);
  return scripts.filter(function(script) {
    return config.scripts[script];
  }).map(function(script) {
    var pathToBootstrapJsFile = JSON.stringify(path.join(pathToFoundationSites, 'js', script));
    return 'require(' + pathToBootstrapJsFile + ');';
  }).join('\n');
};
