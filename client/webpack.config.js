const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      //Rule that directs JavaScript files to be handled by Babel. Notice that we also added a rule to exclude the node modules.
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    })
    //Instead of GenerateSW we will use InjectManifest
    // new WorkboxPlugin.GenerateSW({
    //   //Do not precache images
    //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    //   //Define runtime caching rules
    //   runtimeCaching: [{
    //     //Match any request that ends with .png, .jpg, .jpeg or .svg
    //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    //     //Apply a cache-first strategy
    //     handler: 'CacheFirst',

    //     options: {
    //       //Use a custom cache name
    //       cacheName: 'images',

    //       //Only cache 1 image
    //       expiration: {
    //         maxEntries: 1,
    //       },
    //     },
    //   }],
    // })
  ]
}