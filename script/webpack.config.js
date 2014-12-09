var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path         : './build',
        filename     : 'fluxxor-translation.min.js',
        library      : 'FluxxorTranslation',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.BannerPlugin('Not use this file in production environment! It is only a build to use with html-examples.')
    ]
};
