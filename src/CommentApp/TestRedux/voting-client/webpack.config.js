var webpack = require('webpack');

module.exports = {
    entry: [        
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',    
            __dirname + '/src/index.jsx'
        ],
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "react-hot-loader!babel-loader"
            }
        ]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist', 
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};