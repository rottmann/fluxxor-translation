'use strict';

var constants = require('./constants');

var actions = function(loader) {
    return {
        loadTranslation: function(locale, availableLocales, name) {
            loader.call(loader, locale, availableLocales, name, function(err, translations) {
                if (err)
                    return;
                this.dispatch(constants.REGISTER_TRANSLATION, {
                    locale: locale,
                    translations: translations
                });
            }.bind(this));
        },

        registerPluralizer: function(locale, pluralizer, nPlurals) {
            this.dispatch(constants.REGISTER_PLURALIZER, {
                locale: locale,
                pluralizer: pluralizer,
                nPlurals: nPlurals
            });
        },

        registerTranslation: function(locale, translations) {
            this.dispatch(constants.REGISTER_TRANSLATION, {
                locale: locale,
                translations: translations
            });
        },

        setBaseLocale: function(locale, nPlurals) {
            this.dispatch(constants.SET_BASE_LOCALE, {
                locale: locale,
                nPlurals: nPlurals
            });
        },

        setLocale: function(locale) {
            this.dispatch(constants.SET_LOCALE, {
                locale: locale
            });
        }
    };
};

module.exports = actions;
