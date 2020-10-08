const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function modules() {
    return {
        rules: [
            // // Transpile and polyfill our JavaScript
            // {
            //     test: /\.js$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            /* minimize: true */
                        },
                    },
                    'sass-loader',
                ],
            },
            // {
            //     test: /\.handlebars$/,
            //     loader: 'handlebars-loader',
            // },
        ],
    };
}

function stylesheetsConfiguration(env, argv) {
    const mode = argv.mode;
    const isProduction = mode === 'production';
    return {
        mode,
        module: modules(),
        entry: ['./src/styles/global.scss'],
        output: {
            path: path.resolve(__dirname, './_site/junk'),
            // We actually don't care about this file, but webpack has to output some JS file
            filename: 'JUNK.js',
        },
        watch: !isProduction,
        target: 'web',
        plugins: [
            new MiniCssExtractPlugin({
                filename: '../styles/main.css',
            }),
        ],
    };
}

function jsConfiguration(env, argv) {
    const mode = argv.mode;
    const isProduction = mode === 'production';
    return {
        mode,
        module: modules({
            compilerOptions: {
                target: 'es5',
                lib: ['DOM', 'ES2018'],
            },
        }),
        entry: {
            main: './src/scripts/main.js',
        },
        output: {
            path: path.resolve(__dirname, './_site/scripts'),
            filename: '[name].js',
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            // plugins: [new TsconfigPathsPlugin()],
        },
        watch: !isProduction,
        target: 'web',
    };
}

// function htmlConfiguration(env, argv) {
//     const mode = argv.mode;
//     const isProduction = mode === 'production';

//     return {
//         mode,
//         module: modules(),
//         entry: ['./src/scripts/main.js'], // Not actually related, but I need an entry point
//         output: {
//             path: path.resolve(__dirname, './_site/junk'),
//             // We actually don't care about this file, but webpack has to output some JS file
//             filename: 'JUNK.js',
//         },
//         watch: !isProduction,
//         target: 'web',
//         plugins: [
//             new HandlebarsPlugin({
//                 entry: path.join(process.cwd(), 'src', 'views', 'pages', '*.hbs'),
//                 output: path.join(process.cwd(), 'dist', '[name].html'),
//                 partials: [
//                     path.join(process.cwd(), 'src', 'views', 'partials', '*', '*.hbs'),
//                 ],
//             }),
//             // new CopyWebpackPlugin([{
//             //     from: './src/views',
//             //     to: '../'
//             // }, ]),
//         ],
//     };
// }

function staticConfiguration(env, argv) {
    const mode = argv.mode;
    const isProduction = mode === 'production';

    return {
        mode,
        module: modules(),
        entry: ['./src/scripts/main.js'], // Not actually related, but I need an entry point
        output: {
            path: path.resolve(__dirname, './_site/junk'),
            // We actually don't care about this file, but webpack has to output some JS file
            filename: 'JUNK.js',
        },
        watch: !isProduction,
        target: 'web',
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './src/static',
                    to: '../static',
                },
            ]),
            // new CopyWebpackPlugin([{
            //     from: './src/root',
            //     to: '../',
            // }]),
        ],
    };
}

module.exports = [
    stylesheetsConfiguration,
    jsConfiguration,
    // htmlConfiguration,
    staticConfiguration,
];
