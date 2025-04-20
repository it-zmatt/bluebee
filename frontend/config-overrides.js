module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "react-refresh/runtime": require.resolve("react-refresh/runtime")
  };
  return config;
} 