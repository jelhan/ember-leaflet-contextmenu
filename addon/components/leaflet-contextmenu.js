import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import LeafletMap from 'ember-leaflet/components/leaflet-map';
import { ParentMixin } from 'ember-composability-tools';

const { assert, observer } = Ember;

export default BaseLayer.extend(ParentMixin, {
  addToContainer() {
    let parentComponent = this.get('parentComponent');
    assert(
      'contextmenu is currently only supported on leaflet-map not on any layer',
      parentComponent instanceof LeafletMap
    );

    // store reference to map which is used by leaflet-contextmenu-item
    this._map = parentComponent._layer;

    this.setDisabled();
  },

  createLayer() {
    // nothing to do here
  },

  /**
   * If `true` contextmenu won't show up on rightclick.
   *
   * @param disabled
   * @type boolean
   * @default true
   * @public
   */
  disabled: false,
  setDisabled() {
    let parentComponent = this.get('parentComponent');
    let disabled = this.get('disabled');
    if (disabled) {
      parentComponent._layer.contextmenu.disable();
    } else {
      parentComponent._layer.contextmenu.enable();
    }
  },
  onDisabledChange: observer('disabled', function() {
    this.setDisabled();
  })
});
