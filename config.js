const port = process.env.PORT || 8012;

module.exports = {
  host: 'localhost',
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