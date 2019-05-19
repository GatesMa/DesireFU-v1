module.exports = {
    port: 3000,
    session: {
      secret: 'myblog',
      key: 'myblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://admin:passwd@47.102.121.0:27017/DesireFU?authSource=admin'
}
