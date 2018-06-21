var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
const opn = require('opn');

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
                test: /\.(png|jpe?g|gif|svg|jpg)(\?.*)?$/,
                loader: 'url?limit=10000&name=assets/[name].[ext]'
            }
        ]
    }
};

var compiler = webpack(config, function (err, stats) {
    if (err) console.log(err);
});

var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    //contentBase: "/path/to/directory",
    // Can also be an array, or: contentBase: "http://localhost/",

    hot: true,
    inline: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    historyApiFallback: false,
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.

    compress: true,
    // Set this if you want to enable gzip compression for assets
     proxy: {
        "/apptemplates": "http://xneirong.com",
        "/user": "http://xneirong.com",
         "/api": "http://xneirong.com",
         "/app": "http://xneirong.com",
         "/report": "http://xneirong.com",
         "/static/upload": "http://xneirong.com",
        "/minform": "http://xneirong.com",
         "/minapp": "http://xneirong.com",
         "/goods": "http://xneirong.com"
     },
    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "**" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    staticOptions: {
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    node: {
        fs: "empty"
    },
    setup: function(app) {
        // Here you can access the Express app object and add your own custom middleware to it.
        // For example, to define custom handlers for some paths:
        // app.get('/some/path', function(req, res) {
        //   res.json({ custom: 'response' });
        // });
    },
    clientLogLevel: "info",
    // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    //lazy: true,
    //filename: "bundle.js",
    // It's a required option.
    publicPath: "/dist/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
});
server.listen(2000, "localhost", function() {
    opn('http://localhost:2000/')
});
