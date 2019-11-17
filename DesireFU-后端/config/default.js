module.exports = {
    port: 3000,
    session: {
      secret: 'myblog',
      key: 'myblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://admin:passwd@127.0.0.1:27017/DesireFU?authSource=admin'
}
