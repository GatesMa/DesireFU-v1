const bodyParser = require('body-parser')

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.get('/', function (req, res) {
        res.redirect('/')
    })

    
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/info', require('./info'))
    app.use('/user', require('./user'))
}