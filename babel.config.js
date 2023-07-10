module.exports = function (api) {
  api.cache.forever();
  return {
    presets: ["@babel/preset-env", "@babel/preset-react", '@babel/preset-typescript'],
    plugins: [
      "macros",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-modules-commonjs",
    ],
    ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
  };
};
