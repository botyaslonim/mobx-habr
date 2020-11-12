'use strict';

const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');
const pkg               = require('./package.json');
const structure         = require('./structure.json');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob              = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.npm_lifecycle_event;

// из-за различий виндового и линуксового шела разные пути для поиска среды в объекте NODE_ENV
const isLocal = NODE_ENV === 'local';
const isTest = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest') ;
const isDemo = process.env.NODE_ENV === 'demo';
const isProduction = process.env.NODE_ENV === 'prod';
const TAG = process.env.TAG;

const setPath = function() {
    return path.resolve(__dirname, './node_modules');
};

const static_root = path.resolve(__dirname,`./public/`);
const source_root = path.resolve(__dirname, '.');

const buildingForProd = () => {
    if (TAG && TAG !== '') {
        console.log('----------------------');
        console.log('----------------------');
        if (isLocal) {
            console.log('ENV is:', process.env.npm_lifecycle_event);
            console.log('TAG:', TAG);
            console.log('TAG exists, minification is proceed');
        }
        else {
            console.log('ENV is:', process.env.NODE_ENV);
            console.log('TAG:', TAG);
            console.log('TAG exists, minification is proceed');
        }
        console.log('----------------------');
        console.log('----------------------');
        return true;
    }
    else {
        console.log('----------------------');
        console.log('----------------------');``
        if (isLocal) {
            console.log('ENV is:', process.env.npm_lifecycle_event);
        }
        else {
            console.log('ENV is:', process.env.NODE_ENV);
        }
        console.log('----------------------');
        console.log('----------------------');
        return false;
    }
};

let entryScripts = glob.sync('./common/js/*.js').reduce((entries, entry) => Object.assign(entries, {[entry.split('/').pop().replace('.js', '')]: entry}), {});
entryScripts = Object.assign(entryScripts, glob.sync('./widgets/**/*-index.js').reduce((entries, entry) => Object.assign(entries, {[entry.split('/').pop().replace('.js', '')]: entry}), {}));

let entryStyles = fs.readdirSync(path.resolve(source_root, 'common/less/'));
entryStyles = Object.assign(entryStyles, fs.readdirSync(path.resolve(source_root, 'widgets/')));

/**
 * Generate output
 *
 */
module.exports = {

    resolveLoader: {
        modules: [setPath()]
    },

    devtool: false,

    mode: buildingForProd() ? 'production' : 'development',

    entry: entryScripts,

    /**
     * Place output files to static_root
     *
     */
    output: {
        path      : static_root,
        publicPath: '../',
        filename  : `${structure.outputJs}[name].js`
    },

    stats: {
        entrypoints: false,
        children: false,
        builtAt: true,
        errors: true,
        errorDetails: true,
        assets: false,
        warnings: true,
        maxModules: 0
    },

    plugins: [
        new webpack.DefinePlugin({
            isLocal          : JSON.stringify(isLocal),
            isProduction     : JSON.stringify(isProduction),
            isDemo           : JSON.stringify(isDemo),
            isTest           : JSON.stringify(isTest)
        }),
        new webpack.ProvidePlugin({
            $     : "jquery",
            jQuery: "jquery",
            Promise: 'es6-promise-promise'
        }),
        new webpack.BannerPlugin({
            banner   : '@env ' + (process.env.NODE_ENV || 'unknown') + ':' + pkg.version,
            entryOnly: true
        })
    ],

    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },

    optimization: (TAG && TAG !== '') ?
        {
            minimize: true,
        } :
        {
            minimize: false
        },

    /**
     * Extract fonts and images and place to relative
     * ${outputImages} | ${outputFonts}
     */
    module: {
        rules: [
            {test: /\.json$/, loader: "json-loader"},
            {
                test   : /\.(es6|js|jsx)$/,
                loader : 'babel-loader',
                include: [source_root],
                exclude: /(node_modules|bower_components)/,
                query  : {
                    cacheDirectory: true
                }
            },
            {
                test   : /^((?!font\.svg).)*\.svg$|\.(jpg|jpeg|gif|png|ico)$/,
                loader : `url-loader?limit=1024&name=${structure.outputImages}[name].[ext]`,
                include: [source_root]
            },
            {
                test   : /font\.svg$|\.(woff|woff2|eot|ttf)$/,
                loader : `url-loader?limit=1024&name=${structure.outputFonts}[name].[ext]`,
                include: [source_root]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            }
        ]
    }
};

/**
 * Extract css from less and place to relative ${outputStyle}
 *
 */
entryStyles.forEach((item) => {
    const extractor = new ExtractTextPlugin({
        filename : `${structure.outputStyle}${item}.css`,
        allChunks: true
    });
    module.exports.plugins.push(extractor);

    module.exports.module.rules.push({
        test : function(absPath) {
            if (absPath.indexOf('.less') !== -1)
                return item === path.basename(absPath, '.less');
            return false;
        },
        loader : (TAG && TAG !== '') ?
            extractor.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            })
            : extractor.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }]
                }
            ),
        include: [source_root]
    });

});
