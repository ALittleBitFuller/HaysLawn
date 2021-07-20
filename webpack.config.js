const path = require( 'path' );
// const webpack = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const HtmlMinimizerPlugin = require( "html-minimizer-webpack-plugin" );
const CopyPlugin = require( "copy-webpack-plugin" );
// const ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" );

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
                },
                // {
                //     test: /\.(jpe?g|png|gif|svg)$/i,
                //     use: [
                //         {
                //             loader: 'file-loader', // Or `url-loader` or your other loader
                //         },
                //     ],
                // },
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
            // new ImageMinimizerPlugin(),
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