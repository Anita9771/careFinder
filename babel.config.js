module.exports = function (api) {
  cache.forever();
    return {
      plugins: ['macros', 'babel-jest', '@babel/plugin-proposal-class-properties'],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['my-custom-babel-preset','@babel/preset-env',
          '@babel/preset-react',],
          ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
        }
      }
    }
}
  