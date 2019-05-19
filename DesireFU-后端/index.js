
const express = require('express')

const config = require('config-lite')(__dirname)
const routes = require('./routes')

const pkg = require('./package')

const app = express()



// Configuare https
const httpsOption = {
    key : fs.readFileSync("./https/xxxxxxxxxxxx.key"),
    cert: fs.readFileSync("./https/xxxxxxxxxxxx.pem")
}
// Create service

http.createServer(app).listen(80);
https.createServer(httpsOption, app).listen(443);


// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
    
    console.log(`${pkg.name} listening on port ${config.port}`)
})