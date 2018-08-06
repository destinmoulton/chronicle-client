var path = require("path");
var webpack = require("webpack");
// Uncomment to enable the BundleAnalyzer
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//    .BundleAnalyzerPlugin;
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "chronicleclient.js",
        path: __dirname + "/dist/js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    //plugins: [new BundleAnalyzerPlugin()],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        lodash: "_",
        antd: "antd",
        react: "React",
        immutable: "Immutable",
        moment: "moment",
        "react-dom": "ReactDOM"
    }
};
