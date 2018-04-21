const port = process.env.PORT || 8787;

module.exports = {
  host: '127.0.0.1',
  port: port,
  view: {
    enabled: true,
    engine: 'nunjucks',
  },
  static: {
    enabled: true,
    path: 'static', // 路径
  },
  logRequestTime: true
}