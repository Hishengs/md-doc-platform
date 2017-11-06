module.exports = {
  host: '127.0.0.1',
  port: 8002,
  view: {
    enabled: true,
    engine: 'nunjucks',
    // manual: true
  },
  static: {
    enabled: true,
    path: 'static', // 路径
  },
  logRequestTime: true
}