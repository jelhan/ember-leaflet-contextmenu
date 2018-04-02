# ember-leaflet-contextmenu

[![Build Status](https://travis-ci.org/jelhan/ember-leaflet-contextmenu.svg?branch=master)](https://travis-ci.org/jelhan/ember-leaflet-contextmenu)

Provides a contextmenu for [Ember-Leaflet](http://ember-leaflet.com),
an Ember Addon for [Leaflet](http://leafletjs.com) interactive maps.

This addon is based on a JS library [Leaflet.contextmenu](https://github.com/aratcliffe/Leaflet.contextmenu)
and basically wraps it into ember component for usage in HTMLbars templates.

## Installation

* `ember install ember-leaflet-contextmenu`

## Usage example

```handlebars
{{#leaflet-map lat=lat lng=lng zoom=zoom}}
  {{tile-layer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"}}
  {{#leaflet-contextmenu}}
    {{leaflet-contextmenu-item
      text='show position'
      action=(action 'showPosition')
    }}
  {{/leaflet-contextmenu}}
{{/leaflet-map}}
```

Only a limited set of options provided by [Leaflet.contextmenu](https://github.com/aratcliffe/Leaflet.contextmenu) are supported yet. Binding a contextmenu to layers isn't supported at all. I would appreciate pull requests.

## {{leaflet-contextmenu}}
Wrapper for `{{leaflet-contextmenu-item}}`.

### Options
| Property | Type    | Default | Description           |
| -------- | ------- | ------- | --------------------- |
| disabled | Boolean | false   | If set to true contextmenu is disabled |

## {{leaflet-contextmenu-item}}
### Options
| Property      | Type    | Description |
| ------------- | ------- | ----------- |
| action        | Action  | Action to be called when user clicks on menu item |
| disabled      | Boolean | If set to true menu item is disabled |
| icon 	        | String  | |
| iconCls       | String  | |
| retinaIcon    | String  | |
| retinaIconCls | String  | |
| text          | String  | Label to use for the menu item (required) |

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
