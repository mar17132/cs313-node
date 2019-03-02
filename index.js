const express = require('express')
const path = require('path')
const url = require('url')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'html')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/team09', (req, res) => res.sendfile('html/static_form.html'))
    .get('/math', function(req, res){
        var number1 = url.parse(req.url,true).query.num1;
        var number2 = url.parse(req.url,true).query.num2;
        var operation = url.parse(req.url,true).query.oper;

        res.render('pages/index.ejs'{num1 : number1, num2 : number2, operand : operation});

    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

