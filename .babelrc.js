module.exports = (api) => {
    // Configure caching options here
    api.cache.forever(); // Enable caching
  
    // Rest of your Babel configuration
    const presets = [
        '@babel/preset-env',
        '@babel/preset-react',
      ];
    
      const plugins = [
        'babel-jest',
      ];
    
      return {
        presets,
        plugins,
      };
  };
  