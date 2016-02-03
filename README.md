foundation-sites-loader
---

Foundation configuration and loading package for webpack, using the npm packages `foundation-sites` and `sass-loader`.

Install from [foundation-sites-loader on npm](https://www.npmjs.com/package/foundation-sites-loader).

In a nutshell:

1. You've got the sass-loader to process Sass files to CSS.
2. The npm foundation-sites package places the foundation files in `/node_modules/foundation-sites`.
3. You could simply create your own sass file to pick up foundation from this location, and you could require the js
   files here for the Foundation JavaScript code. See the [sass-loader](https://github.com/jtangelder/sass-loader) for
   instructions on configuring the directories.
4. Or you could use this loader and load a js file that configures Foundation.

Note, `foundation-sites` must be installed locally inside of `../node_modules` or a parent directories `node_modules`
directory relative to the loaded config file.

Foundation Version
---
The version of foundation-sites used is listed in peerDependencies, so you should be able to use whichever version you like.

Simply specify that version of `foundation-sites` in your `package.json`, like this:

    "foundation-sites": "~6.1.2"


Usage
-----

### 1.a Complete Foundation

To use the complete foundation package including styles and scripts with the default settings:

``` javascript
require("foundation-sites-loader");
```

The disadvantage to using this setup is that you can't:

1. Customize the foundation variables: [Foundation Customization](http://foundation.zurb.com/sites/docs/sass.html#the-settings-file)
2. You can't use the foundation variables for your own sass stylesheets.

### 1.b Customized Foundation

1. Copy the file `foundation-sites.config.js` to your project. You will specify the file path in the `require` statement.
2. Open that file to customize the location of a file for any Foundation variable overrides (`preFoundationCustomizations`
   and `foundationCustomizations`, and your main Sass file that can depend on Foundation variables, plus your customizations.
   Any of these 3 files are optional. You may also remove any Sass or Js modules that you don't need.

Next, you should specify this as an entry point:

```
module.exports = {
  entry: [
    "foundation-sites!./path/to/foundation-sites.config.js"
  ]
```

Or a dependency within a file, like you'd specify other webpack dependencies:

```javascript
require("foundation-sites!./path/to/foundation-sites.config.js");
```


#### `foundation-sites.config.js`

Here's a sample configuration file. The file included in the [foundation-sites-loader git repo](https://github.com/vitalyrotari/foundation-sites-loader/blob/master/foundation-sites.config.js)
has many more options. The two customization files, `foundationCustomizations`
and `mainSass` are optional.

```
module.exports = {
  foundationCustomizations: "./foundation-customizations.scss",
  mainSass: "./main.scss", // path to your main SASS file (optional)
  verbose: true, // print out your custom files used
  debug: false, // print out the full generated scss file
  styleLoader: "style-loader!css-loader!sass-loader", // see example for the ExtractTextPlugin
  scripts: {
    // add every foundation script you need
    'foundation.core': true,
    'foundation.accordion': true
  },
  styles: {
    // add every foundation style you need
    'mixins': true,
    'normalize': true,
    'print': true,
    'glyphicons': true
  }
};
```

### Example Loaders Configuration:

```
module.exports = {
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each foundation js file required by
      // foundation-webpack has access to the jQuery object
      { test: /foundation\/js\//, loader: 'imports?jQuery=jquery' }
    ]
  }
};
```

## extract-text-plugin Notes
* If you don't run webpack like this, you might get a very obscure error:
```
PATH=$(npm bin):$PATH webpack --config webpack.rails.config.js
```

Alternate, you can put $(npm bin) in your path. Basically if you run `type webpack` and the path is your global one, then
you may have issues.

* You can configure the output file of the created CSS file by using a relative path to the output directory. For example:
```
  plugins: [
    new ExtractTextPlugin("../stylesheets/foundation-and-customizations.css")
  ]
```

### Based on:
* [bootstrap-sass-loader](https://github.com/shakacode/bootstrap-sass-loader).

# Known Issues
1. Automatic Dependency loading is currently problematic. If you "touch" either of the customization files listed in
   your config file (foundationCustomizations, mainSass), then that will trigger a rebuild of the Sass files. This is a
   known issue with the sass-loader. I work around this issue by "touching" one of the 3 sass config files.


Testing Changes in the Foundation Sites Loader
---

1. See this article [Debugging NodeJs and Webpack Loaders](http://forum.railsonmaui.com/t/debugging-nodejs-and-webpack-loaders/142)
2. Use the npm link command per step #1 (see article)
3. Be sure to run `npm i foundation-sites` in the directory where you have the `foundation-sites-loader`. This is because
   the location of foundation-sites is found relative to the `foundation-sites-loader` and if you linked it and it's not not
   there, then you'll bet this error: "Error: Could not find path to foundation-sites. Check to see that it's in a parent
   directory of config file containing node_modules/foundation-sites".

Pull requests are welcome!

Code Inspection and ESLint
---

1. If using Webstorm import the inspection file in /jetbrains-inspection and inspect all files
2. Command line: `eslint .`

Publishing to NPM
---

1. Install the [release-it npm](https://github.com/webpro/release-it) program
2. Merge fixes to master
3. Run command `release-it`
4. Take defaults, except for last one to publish changes (answer Y)
