# fluxxor-translation

Gettext-style translation lib for [fluxxor](https://github.com/BinaryMuse/fluxxor).

Use [translation-dictionary](https://github.com/rottmann/translation-dictionary)


## Install

#### Node.js
`$ npm install --save fluxxor-translation`


## Example

View browser-example in [example/](example/)

```js
var React = require('react');
var Fluxxor = require('fluxxor');
var FluxxorTranslation = require('fluxxor-translation');
var TranslationMixin = FluxxorTranslation.TranslationMixin(React);

var actions = {
    translation: FluxxorTranslation.actions()
};

var stores = {
    TranslationStore: new FluxxorTranslation.TranslationStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.actions.translation.registerTranslation('de', {
    'This is a text'                        : 'Das ist ein Text',
    'A string %s'                           : 'Eine Zeichenkette %s',
    'Number %d and a string %s'             : 'Nummer %d und eine Zeichenkette %s',
    'Named arguments %(param1)s, %(param2)s': 'Benannte Argumente %(param1)s, %(param2)s',
    'Switch language'                       : 'Sprache wechseln',
    'Singular'                              : 'Einzahl',
    'Plural'                                : 'Mehrzahl'
});

var MyComponent = React.createClass({
    mixins: [
        FluxMixin,
        TranslationMixin() // without storename, default 'TranslationStore' is used
    ],

    render: function() {
        return (
            <div className="my-component">
                <p>{this.__('This is a text')}</p>
                <p>{this.__('A string %s', 'ABC')}</p>
                <p>{this.__('Number %d and a string %s', 4711, 'DEF')}</p>
                <p>{this.__('Named arguments %(param1)s, %(param2)s', { param1: 'GHI', param2: 'JKL' })}</p>
                <p>{this._p('Singular', 'Plural', 1)}</p>
                <p>{this._p('Singular', 'Plural', 2)}</p>
                <button onClick={this.handleSwitchLanguage}>{this.__('Switch language')}</button>
            </div>
        );
    },

    handleSwitchLanguage: function(e) {
        if (this.getFlux().store('TranslationStore').getLocale() === 'de')
            this.getFlux().actions.translation.setLocale('en');
        else
            this.getFlux().actions.translation.setLocale('de');
    }
});

React.render(<MyComponent flux={flux} />, document.getElementById('app'));
```
