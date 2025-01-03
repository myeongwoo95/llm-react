const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/login",
    createProxyMiddleware({
      target: "http://localhost:8080", // process.env 로하면 에러가 발생
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
