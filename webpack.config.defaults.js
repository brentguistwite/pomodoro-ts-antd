const { argv } = require('yargs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = ({ env, lessModifyVars, rootDir }) => {
  const plugins = [
    new CleanWebpackPlugin([path.resolve(rootDir, 'dist')]),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: `en_US.[name].css`,
      chunkFilename: '[id].css',
    }),
  ];
  if (env.analyze) plugins.push(new BundleAnalyzerPlugin());

  return {
    devServer: {
      contentBase: './dist',
    },
    devtool: 'cheap-eval-source-map',
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(tsx?)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'tslint-loader',
          options: {
            failOnHint: true,
          },
        },
        {
          test: /\.(tsx?)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true,
                }),
              ],
            }),
            onlyCompileBundledFiles: true,
          },
        },
        {
          test: /node_modules\/.*\.(css|less)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                javascriptEnabled: true,
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: true,
                modifyVars: lessModifyVars,
              },
            },
          ],
        },
        {
          test: /\.(css|less)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 2,
                javascriptEnabled: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                modules: true,
                namedExport: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: true,
                modifyVars: lessModifyVars,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
        },
      ],
    },
    output: {
      filename: `en_US.[name].js`,
      path: path.resolve(rootDir, 'dist'),
    },
    plugins,
    resolve: {
      alias: {
        COMPONENTS: path.resolve(rootDir, 'src/components/'),
        GLOBAL: path.resolve(__dirname, 'public/'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
      symlinks: false,
    },
  };
};
