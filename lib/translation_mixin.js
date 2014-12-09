'use strict';

var TranslationMixin = function(React) {
    if ( ! React)
        throw new Error('fluxxor-translation.Mixin is a function that need React as parameter and returns the mixin ' +
            'function, \ne.g.: var TranslationMixin = require(\'fluxxor-translation\').TranslationMixin(React);');

    var Mixin = function(store) {
        store = store || 'TranslationStore';
        return {
            // Enable flux access without FluxMixin
            contextTypes: {
                flux: React.PropTypes.object
            },

            componentWillMount: function() {
                var flux = this.props.flux || (this.context && this.context.flux);
                var name;
                if ( ! flux) {
                    name = this.constructor.displayName ? ' of ' + this.constructor.displayName : '';
                    throw new Error('Could not find flux on this.props or this.context' + name);
                }

                var fluxStore = flux.store(store);
                if ( ! fluxStore) {
                    name = this.constructor.displayName ? this.constructor.displayName : '';
                    throw new Error('Could not find store ' + store + ' in ' + name);
                }

                fluxStore.on('change', function() {
                    this.forceUpdate();
                }.bind(this));
            },

            componentWillUnmount: function() {
                var flux = this.props.flux || (this.context && this.context.flux);
                var fluxStore = flux.store(store);
                fluxStore.off('change');
            },

            __: function() {
                var flux = this.props.flux || (this.context && this.context.flux);
                var fluxStore = flux.store(store);
                return fluxStore.translate.apply(fluxStore, arguments);
            },

            _p: function() {
                var flux = this.props.flux || (this.context && this.context.flux);
                var fluxStore = flux.store(store);
                return fluxStore.translatePlural.apply(fluxStore, arguments);
            }
        };
    };

    /**
     * Throws an error if it is not called as a function.
     */
    Mixin.componentWillMount = function() {
        throw new Error('fluxxor-translation.TranslationMixin function takes an optional store name as parameter and ' +
            'returns the mixin,\ne.g.: mixins [ TranslationMixin() ] or mixins [ TranslationMixin(\'TranslationStore\') ]\n' +
            'Default store name is: \'TranslationStore\'.');
    };

    return Mixin;
};

module.exports = TranslationMixin;
