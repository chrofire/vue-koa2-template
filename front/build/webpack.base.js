const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')]
            },
            {
                // 对图片资源进行打包编译
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 文件的大小小于8kb的时候会返回一个base64
                    limit: 8 * 1024,
                    name: '[name].[hash:7].[ext]',
                    // 关闭es6模块化
                    esModule: false,
                    //  图片资源的输出路径
                    outputPath: 'images'
                }
            },
            {
                // 对视频文件进行打包编译
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'media'
                }
            },
            {
                // 对字体文件进行打包编译
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'fonts'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: path.resolve(__dirname, '../dist/index.html')
        })
    ]
}