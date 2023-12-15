const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@root": path.resolve(__dirname, "src"),
      "@views": path.resolve(__dirname, "src/views"),
      "@static": path.resolve(__dirname, "src/static"),
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),

      "@selectors": path.resolve(__dirname, "src/redux/selectors"),
      "@actions": path.resolve(__dirname, "src/redux/actions"),
      "@reducers": path.resolve(__dirname, "src/redux/reducers"),
    },
  },
};
