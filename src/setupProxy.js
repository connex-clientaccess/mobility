const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: "https://api.copper.com",
  changeOrigin: true,
};

module.exports = function (app) {
  app.use("/search", createProxyMiddleware(proxy));
};
