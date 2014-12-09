# Example for a custom translation Ajax-Loader

With an own translationLoader function and the mixin you can implement a "by component" language load on demand.


## Base


```js
var FluxxorTanslation = require('fluxxor-translation');

var actions = {
    translation: FluxxorTanslation.actions(translationLoader)
};

var stores = {
    TranslationStore: new FluxxorTanslation.TranslationStore()
};

var loadedLocales = {};
function translationLoader(locale, availableLocales, name, cb) {
    if(availableLocales.indexOf(locale) === -1)
        return cb(true); // the application has a language that is not supported by component

    var key = JSON.stringify([locale, availableLocales, name]);
    if (loadedLocales[key])
        return cb(true); // it is in cache

    loadedLocales[key] = 1;

    // e.g. insert here an Ajax-Loader
    return cb(null, {
        'a car'   : 'ein auto',
        'two cars': 'zwei autos'
    });
}

var flux = new Fluxxor.Flux(stores, actions);

flux.actions.translation.registerTranslation('de', {}); // application language

// Simulate a switch language click
setTimeout(function() {
    flux.actions.translation.setLocale('de');
}, 1000);
```


## Component (mixin)

```js
componentWillMount: function() {
    var availableLocales = [ 'de' ]; // the locales available for this component

    // Update the current view on load
    this._loadTranslation(availableLocales);

    var store = 'TranslationStore';
    var flux = this.props.flux || (this.context && this.context.flux);
    var fluxStore = flux.store(store);

    // Update the current view when the locale changed and this view is visible.
    fluxStore.on('change', function() {
        // TODO: find a solution for the setTimeout hack
        // The loadTranslation dispatch is called before a previous registration is finished.
        // Error: Cannot dispatch an action ('REGISTER_TRANSLATION') while another action ('SET_LOCALE') is being dispatched
        // this._loadTranslation();
        setTimeout(function() {
          this._loadTranslation(availableLocales);
        }.bind(this), 10)
    }.bind(this));
},

componentWillUnmount: function() {
    var store = 'TranslationStore';
    var flux = this.props.flux || (this.context && this.context.flux)
    var fluxStore = flux.store(store);
    fluxStore.off('change');
},

_loadTranslation: function(availableLocales) {
    var store = 'TranslationStore';
    var locale = this.getFlux().store(store).getLocale();
    var name = this.constructor.displayName ? this.constructor.displayName : '';
    this.getFlux().actions.translation.loadTranslation(locale, availableLocales, name);
},
```
