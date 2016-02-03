var partials = [
  'grid/grid',
  'typography/typography',
  'forms/forms',
  'components/visibility',
  'components/float',
  'components/button',
  'components/button-group',
  'components/accordion-menu',
  'components/accordion',
  'components/badge',
  'components/breadcrumbs',
  'components/callout',
  'components/close-button',
  'components/drilldown',
  'components/dropdown-menu',
  'components/dropdown',
  'components/flex-video',
  'components/label',
  'components/media-object',
  'components/menu',
  'components/off-canvas',
  'components/orbit',
  'components/pagination',
  'components/progress-bar',
  'components/reveal',
  'components/slider',
  'components/sticky',
  'components/switch',
  'components/table',
  'components/tabs',
  'components/title-bar',
  'components/top-bar',
  'components/thumbnail',
  'components/tooltip'
];

var path = require('path');
var foundationSitesPath = require('./foundationSitesPath');
var logger = require('./logger');

function addImportReturnDependency(loader, config, propertyName) {
  var fileNameResolved;
  var fileName = config[propertyName];
  if (fileName && fileName.length > 0) {
    fileNameResolved = path.relative(loader.context, fileName);

    logger.verbose(config, 'fileName for %s: %s', propertyName, fileNameResolved);
    loader.addDependency(fileNameResolved);
    return '@import \'' + fileNameResolved + '\';\n';
  }
}

module.exports = function(content) {
  var source;
  var config = this.exec(content, this.resourcePath);
  var pathToBootstrapSass = foundationSitesPath.getPath(this.context);
  var relativePathToFoundationSites = path.relative(this.context, pathToBootstrapSass);
  var start = '';

  this.cacheable(true);
  logger.verbose(config, 'foundation-sites location: %s', relativePathToFoundationSites);

  if (config.preFoundationCustomizations) {
    start += addImportReturnDependency(this, config, 'preFoundationCustomizations');
  }
  start +=
    // Absolute paths as these are created at build time.
    '@import \'' + path.join(relativePathToFoundationSites, 'scss/util/util') + '\';\n' +
    '@import \'' + path.join(relativePathToFoundationSites, 'scss/global') + '\';\n';

  if (config.foundationCustomizations) {
    start += addImportReturnDependency(this, config, 'foundationCustomizations');
  }

  source = start + partials.filter(function(partial) {
      return config.styles[partial];
    }).map(function(partial) {
      return '@import \'' + path.join(relativePathToFoundationSites, 'scss', partial) + '\';';
    }).join('\n');

  if (config.mainSass) {
    source += '\n' + addImportReturnDependency(this, config, 'mainSass');
  }

  source = source.replace(/\\/g, '/');
  logger.debug(config, 'Generated scss file is:\n' + source);

  return source;
};
