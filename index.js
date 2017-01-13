/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-leaflet-contextmenu',
  included: function(app) {
    app.import(app.bowerDirectory + '/Leaflet.contextmenu/dist/leaflet.contextmenu.js');
    app.import(app.bowerDirectory + '/Leaflet.contextmenu/dist/leaflet.contextmenu.css');
 }
};
