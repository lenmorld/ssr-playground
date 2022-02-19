const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'development', // development | production
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',
                                    '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: {
        port: 9000, // default 8080,
        static: './dist'
    },
    plugins: [
        // no params, basic HTML with the bundle inserted as script tag
        // new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}

