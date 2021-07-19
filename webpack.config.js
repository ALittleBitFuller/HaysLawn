const path = require( 'path' );
// const webpack = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const HtmlMinimizerPlugin = require( "html-minimizer-webpack-plugin" );
const CopyPlugin = require( "copy-webpack-plugin" );

module.exports = () => {

    return [ {
        name: 'prodbuild',
        mode: 'production',
        target: 'web',
        // entry: '.src/index.js',
        output: {
            path: __dirname + '/public/'
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    type: "asset/resource"
                },
                {
                    test: /.s?css$/,
                    use: [ 'css-loader', 'sass-loader' ]
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin( {
                patterns: [
                    {
                        from: "src",
                        globOptions: {
                            ignore: [ "**/index.js" ]
                        }
                    },
                ],
            } ),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new HtmlMinimizerPlugin(),
            ],
        },
    } ]

};