import { moduleForComponent, test } from 'ember-qunit';
import { click, find, findAll } from 'ember-native-dom-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import jQuery from 'jquery';

moduleForComponent('leaflet-contextmenu', 'Integration | Component | leaflet-contextmenu', {
  integration: true
});

test('renders a contextmenu', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.ok(find('.leaflet-contextmenu'));
});

test('contextmenu is not visible by default', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.notOk(jQuery(find('.leaflet-contextmenu')).is(':visible'));
});

test('right mouse click on map opens contextmenu', async function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item}}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);

  let leafletContainer = find('.leaflet-container');
  let { x: clientX, y: clientY } = leafletContainer.getBoundingClientRect();
  // ToDo: use ember-native-dom-helpers as soon as contextmenu events are supported
  //       await click('.leaflet-container', 'contextmenu', { clientX, clientY });
  run(() => {
    leafletContainer.dispatchEvent(new MouseEvent('contextmenu', { clientX, clientY }));
  });
  assert.ok(jQuery(find('.leaflet-contextmenu')).is(':visible'));
});

test('renders contextmenu items', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item}}
        {{leaflet-contextmenu-item}}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.equal(findAll('.leaflet-contextmenu .leaflet-contextmenu-item').length, 2);
});

test('renders text of contextmenu item', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item
          text='foo'
        }}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.equal(find('.leaflet-contextmenu .leaflet-contextmenu-item').textContent.trim(), 'foo');
});

test('renders contextmenu items in same order as in template', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item
          text='foo'
        }}
        {{leaflet-contextmenu-item
          text='bar'
        }}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.deepEqual(findAll('.leaflet-contextmenu .leaflet-contextmenu-item').map((_) => _.textContent.trim()), ['foo', 'bar']);
});

test('renders contextmenu items as link elements', function(assert) {
  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item}}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  assert.equal(find('.leaflet-contextmenu .leaflet-contextmenu-item').tagName, 'A');
});

test('click on contextmenu item triggers action', async function(assert) {
  assert.expect(1);

  this.set('myAction', function() {
    assert.ok(true);
  });

  this.render(hbs`
    {{#leaflet-map lat=0 lng=0 zoom=10}}
      {{#leaflet-contextmenu}}
        {{leaflet-contextmenu-item
          action=(action myAction)
        }}
      {{/leaflet-contextmenu}}
    {{/leaflet-map}}
  `);
  await click('.leaflet-contextmenu .leaflet-contextmenu-item');
});
