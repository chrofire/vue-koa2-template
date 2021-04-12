const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ]
}

module.exports = merge(baseConfig, prodConfig)