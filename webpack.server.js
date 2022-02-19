const path = require('path')
const nodeExternals = require('webpack-node-externals')

/*
    transpile using Babel, output to 
    `server-build/index.js`

    nodeExternals omits node_modules in the bundle
    server can access these files directly
*/

module.exports = {
    mode: 'development', // development | production
    entry: './server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
}