/* eslint-disable ember-suave/prefer-destructuring */
'use strict';

let map = require('broccoli-stew').map;
let path = require('path');
let Funnel = require('broccoli-funnel');
let MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-leaflet-contextmenu',
  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/leaflet-contextmenu/leaflet.contextmenu.js');
    app.import('vendor/leaflet-contextmenu/leaflet.contextmenu.css');
  },
  treeForVendor(defaultTree) {
    let trees = [];
    let lcPath = path.join(this.project.root, 'node_modules', 'leaflet-contextmenu', 'dist');
    let browserVendorLib = new Funnel(lcPath, {
      destDir: 'leaflet-contextmenu',
      files: [
        'leaflet.contextmenu.js'
      ]
    });
    let vendorCss = new Funnel(lcPath, {
      destDir: 'leaflet-contextmenu',
      files: [
        'leaflet.contextmenu.css'
      ]
    });

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    if (defaultTree !== undefined) {
      trees.push(defaultTree);
    }

    trees.push(browserVendorLib);
    trees.push(vendorCss);

    return new MergeTrees(trees);
  }
};
