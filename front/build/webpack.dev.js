const path = require('path')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

const devConfig = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')], // 指定检查的目录
                options: {
                    // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
                    formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
                    fix: true
                }
            }
        ]
    },
    plugins: [
        
    ]
}

module.exports = merge(baseConfig, devConfig)
