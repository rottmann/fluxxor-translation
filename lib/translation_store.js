/**
 * Fluxxor Store wrapper for translation-dictionary.
 */

'use strict';

var Fluxxor = require('fluxxor');
var Dict = require('translation-dictionary');

var constants = require('./constants');

var TranslationStore = Fluxxor.createStore({
    initialize: function() {
        this.dict = new Dict();
        this.dict.on('changeLocale'     , this.onChangeLocale);
        this.dict.on('changeTranslation', this.onChangeLocale);

        this.bindActions(
            constants.REGISTER_PLURALIZER , this.onRegisterPluralizer,
            constants.REGISTER_TRANSLATION, this.onRegisterTranslation,
            constants.SET_BASE_LOCALE     , this.onSetBaseLocale,
            constants.SET_LOCALE          , this.onSetLocale
        );
    },

    onChangeLocale: function() {
        this.emit('change');
    },

    onRegisterPluralizer: function(payload) {
        this.dict.registerPluralizer.call(this.dict, payload.locale, payload.pluralizer, payload.nPlurals);
    },

    onRegisterTranslation: function(payload) {
        this.dict.registerTranslation.call(this.dict, payload.locale, payload.translations);
    },

    onSetBaseLocale: function(payload) {
        this.dict.setBaseLocale.call(this.dict, payload.locale, payload.nPlurals);
    },

    onSetLocale: function(payload) {
        this.dict.setLocale.call(this.dict, payload.locale);
    },

    /**
     * Get dict instance
     * E.g. to register own event handler to log missingTranslations.
     * @return {object}
     */
    getDictionary: function() {
        return this.dict;
    },

    getLocale: function( /*arguments*/ ) {
        return this.dict.getLocale.apply(this.dict, arguments);
    },

    translate: function( /*arguments*/ ) {
        return this.dict.translate.apply(this.dict, arguments);
    },

    translatePlural: function( /*arguments*/ ) {
        return this.dict.translatePlural.apply(this.dict, arguments);
    }

});

module.exports = TranslationStore;
