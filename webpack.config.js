module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "./dist/out.js"
    },
    devServer: {
        inline: true,
        contentBase: ".",
        port: 3001
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};