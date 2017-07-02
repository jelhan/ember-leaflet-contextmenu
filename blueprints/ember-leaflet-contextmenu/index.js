/*jshint node:true*/
module.exports = {
  description: 'add Leaflet.contextmenu as bower dependency',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
 },

  afterInstall: function() {
    return this.addPackageToProject('leaflet-contextmenu');
  }
};
