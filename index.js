const express = require('express')
const path = require('path')
const url = require('url')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'html')))
    .use(express.static(path.join(__dirname, 'prove')))
    .set('views', path.join(__dirname, 'views'))
    .set('views', path.join(__dirname, 'prove'))
    .set('view engine', 'ejs')

    //team act 09
    .get('/team09', (req, res) => res.sendfile('html/static_form.html'))
    .get('/math', function(req, res){
        var number1 = url.parse(req.url,true).query.num1;
        var number2 = url.parse(req.url,true).query.num2;
        var operation = url.parse(req.url,true).query.oper;

        res.render('pages/index.ejs',{num1 : number1, num2 : number2, operand : operation});

    })
    .get('/math_service', function(req, res){
        var number1 = parseInt(url.parse(req.url,true).query.num1);
        var number2 = parseInt(url.parse(req.url,true).query.num2);
        var operation = url.parse(req.url,true).query.oper;
        var myresutls = 0;

        if(operation == "add")
        {
            myresutls = number1 + number2;
        }
        else if(operation == "sub")
        {
            myresutls = number1 - number2;
        }
        else if(operation == "mul")
        {
            myresutls = number1 * number2;
        }
        else if(operation == "div")
        {
            myresutls = number1 / number2;
        }
        res.send({results: myresutls});

    })
    //end team act 09
    //prove week9
    .get('/prove9',(req,res) => res.sendfile('prove/week9/week9.html'))
    .get('/getRate',function(req,res){
        var cal = require('prove/week9/week9.js');

        var mailrate = cal.calculateRate(url.parse(req.url,true).query.weight,
                                         url.parse(req.url,true).query.letter);
        res.render('/prove/week9/week9.ejs',{result: mailrate});
    })
    //end prove week9
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

