var fs = require('fs');
var path = require('path');

function foundationNotFound() {
  var msg = 'Could not find path to foundation-sites. Check to see that it is in a parent ' +
    'directory of config file containing node_modules/foundation-sites';
  console.error('ERROR: ' + msg);
  throw new Error(msg);
}

function createTestParentPath(configPath, nLevelsUp) {
  var parentPath;
  var i;
  var levelsUp = configPath;
  for (i = 0; i < nLevelsUp; i++) {
    levelsUp += '/..';
  }
  parentPath = path.resolve(levelsUp);
  if (parentPath === '/') {
    foundationNotFound();
  }

  return path.resolve(path.join(levelsUp, 'node_modules', 'foundation-sites'));
}

module.exports = {
  getPath: function(configPath) {
    var foundationSassParentPath;
    var i = 0;
    do {
      foundationSassParentPath = createTestParentPath(configPath, i);
      i += 1;
    } while (!fs.existsSync(foundationSassParentPath) && i < 10);

    if (i === 10) {
      foundationNotFound();
    }
    return foundationSassParentPath;
  }
};
