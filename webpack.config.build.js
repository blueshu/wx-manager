var path = require('path')
var webpack = require('webpack')

var config = {
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue'},
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url?limit=10000&name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

webpack(config, function (err, stats) {
    if (err) console.log(err);
});
