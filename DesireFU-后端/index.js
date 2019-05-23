
const express = require('express')

const config = require('config-lite')(__dirname)
const routes = require('./routes')

const pkg = require('./package')

const app = express()
let http = require("http");
let https = require("https");
let fs = require("fs");
const httpsOption = {
    key : fs.readFileSync("./http/1891211_www.gatesma.cn.key"),
    cert: fs.readFileSync("./http/1891211_www.gatesma.cn.pem")
}



// 路由
routes(app)

// 监听端口，启动程序
// app.listen(config.port, function () {
    
//     console.log(`${pkg.name} listening on port ${config.port}`)
// })

https.createServer(httpsOption, app).listen(3000);