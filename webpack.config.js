module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "./dist/out.js"
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style!css" }
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
