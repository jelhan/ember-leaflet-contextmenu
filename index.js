/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-leaflet-contextmenu',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/leaflet-contextmenu/leaflet.contextmenu.js');
    app.import('vendor/leaflet-contextmenu/leaflet.contextmenu.css');
 },
 treeForVendor(vendorTree) {
    let lcPath = path.join(this.project.root, 'node_modules', 'leaflet-contextmenu', 'dist');
    return new Funnel(lcPath, {
      destDir: 'leaflet-contextmenu',
      files: [
        'leaflet.contextmenu.js',
        'leaflet.contextmenu.css'
      ]
    });
  },
};
