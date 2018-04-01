import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { observer } from '@ember/object';
import BaseLayer from 'ember-leaflet/components/base-layer';
import LeafletContextmenu from './leaflet-contextmenu';

export default BaseLayer.extend({
  addToContainer() {
    let parentComponent = this.get('parentComponent');
    let options = assign({ callback: this.get('action') }, this.get('options'));

    assert('Must be wrapped in {{leaflet-contextmenu}}', parentComponent instanceof LeafletContextmenu);

    this._element = this._layer = parentComponent._map.contextmenu.addItem(options);
  },

  createLayer() {
    // nothing to do here
  },

  disabledChanged: observer('disabled', function() {
    let parentComponent = this.get('parentComponent');
    let disabled = this.get('disabled');
    parentComponent._map.contextmenu.setDisabled(this._element, disabled);
  }),

  leafletOptions: ['text', 'icon', 'retinaIcon', 'iconCls', 'iconCls', 'disabled'],

  removeFromContainer() {
    this.get('parentComponent')._map.contextmenu.removeItem(this._element);
  }
});
