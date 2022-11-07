const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
//const { GenerateSW } = require('workbox-webpack-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new WebpackPwaManifest({
      name: 'Contact Cards Application',
      short_name: 'Contact Cards',
      description: 'Keep track of contacts.',
      background_color: '#7eb4e2',
      theme_color: '#7eb4e2',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/contact-info_512px.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
        {
          src: path.resolve('src/images/contact-info_512px.png'),
          size: '1024x1024',
          destination: path.join('assets', 'icons'),
          purpose: 'maskable'
        }
      ],
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }),
    // new CompressionPlugin({
    //   algorithm: "gzip"
    // }),
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
  ],

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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }
      }
    ],
  },
}