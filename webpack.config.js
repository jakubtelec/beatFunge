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
        rules: [

            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['env']
            //         }
            //     }
            // },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
};