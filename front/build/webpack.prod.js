const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

const prodConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:7].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:7].css',
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports = merge(baseConfig, prodConfig)