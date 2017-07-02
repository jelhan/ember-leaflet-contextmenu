import Ember from 'ember';
/* global alert */

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    showPosition(event) {
      let { lat, lng } = event.latlng;
      alert(`Selected point: ${lat}, ${lng}`);
    },
    toggle(property) {
      this.toggleProperty(property);
    }
  },
  contextmenuWidth: 250,
  disabledContextmenu: false,
  disabledShowPosition: false,
  hideAnotherItem: true
});
