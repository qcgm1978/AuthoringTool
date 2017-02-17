/**
 * Created by liuhan on 2015/12/4.
 */
var LiveReloadPlugin = require('webpack-livereload-plugin');
//var objAssign=require('transform-object-rest-spread')
module.exports = {
    entry: {
        // bundle: "./modules/entry.js",
        'bundle-export': "./modules/entry-export.js"
    },//The entry point for the bundle.
    output: {
        publicPath: '',
        path: "build",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,//A condition that must be met
                loader: "style!css"//A string of “!” separated loaders
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]// An array of loaders as string
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                //Given passing a query string like this isn't particularly readable, another way is to use the combination of loader and query fields:
                //query: {
                //    presets: ['react', 'es2015']
                //},
                //"plugins": ["syntax-object-rest-spread"]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader'//?limit=30000&name=[name]-[hash].[ext]'; The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.
            }
        ]
    },
    //Specify dependencies that shouldn’t be resolved by webpack, but should become dependencies of the resulting bundle.
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },
    //Add additional plugins to the compiler.
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
            port: 35728//port - (Default: 35729) The desired port for the livereload server, config when multiple instance executed
        }),
        //"transform-object-rest-spread"
    ]
};
