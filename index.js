const express = require('express')
const path = require('path')
const url = require('url')
const session = require('express-session')
//const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const connectionString = 'postgres://wmogwwdzthguoj:f5a8a72f73a9f52bc2f92dd44c8bac1c482a7cb56f97519e1c9b09492f91f751@ec2-54-204-13-34.compute-1.amazonaws.com:5432/d865mrc436havr'
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'html')))
    .use(express.static(path.join(__dirname, 'prove')))
    .use(express.static(path.join(__dirname, 'project')))
    .use(session({
        secret: 'bobeathiscoat',
        resave: false,
        saveUninitialized: true
    }))
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use(function(request, response, next) {
	console.log("Received a request for: " + request.url);
	next();
    })
    .set('views', path.join(__dirname, 'views'))
    .set('views', path.join(__dirname, 'prove'))
    .set('views', path.join(__dirname, 'project'))
    .set('view engine', 'ejs')

    /*###########Project 2###############*/
    .get('/project2',(req,res) => res.sendfile('project/index.html'))
    .get('/restaurants',function(req,res){

        var myVar = url.parse(req.url,true).query;
        var queryText = "SELECT restaurants.ID, restaurants.Name,\
                    STRING_AGG(category.id::CHARACTER VARYING, ',') AS cat_id,\
                        STRING_AGG(category.name, ',') AS cat_name\
                        FROM category\
                        JOIN rest_to_cat\
                        ON rest_to_cat.cat_id = category.ID\
                        JOIN restaurants\
                        ON restaurants.ID = rest_to_cat.rest_id";

        if(myVar.id != null)
        {
            queryText += " WHERE restaurants.ID='" + myVar.id + "'\
                           GROUP BY restaurants.ID;";
        }
        else
        {
            queryText += " GROUP BY restaurants.ID;";
        }

        queryDB(queryText,function(err,queryRes){

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                if(queryRes.length < 1)
                {
                    res.status(200).json({message:"No Restaurants found"});
                }
                else
                {
                    res.status(200).json(queryRes);
                }
            }

        });


    })
    .get('/add',function(req,res){

        var myVar = url.parse(req.url,true).query;
        console.log(myVar);
        var queryText = "INSERT INTO ";

        if(myVar.addType != null)
        {
            if(myVar.addType == "restaurants")
            {
                queryText += "restaurants(Name) VALUES('" + myVar.name + "');";
            }
        }


        queryDB(queryText,function(err,queryRes){

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                res.status(200).json({pageType:myVar.addType});
            }

        });


    })
   .get('/remove',function(req,res){

        var myVar = url.parse(req.url,true).query;
        console.log(myVar);
        var queryText = "DELETE FROM ";

        if(myVar.removeType != null)
        {
            if(myVar.removeType == "restaurants")
            {
                queryText += "restaurants WHERE id = '" + myVar.id + "';";
            }
        }


        queryDB(queryText,function(err,queryRes){

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                res.status(200).json({pageType:myVar.removeType});
            }

        });


    })
   .get('/categories',function(req,res){

        var myVar = url.parse(req.url,true).query;
        console.log(myVar);
        var queryText = "SELECT * FROM category;";

        queryDB(queryText,function(err,queryRes){

            console.log(queryRes);

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                //queryRes['page'] = myVar.pageType;
                res.status(200).json({cats:queryRes,page:myVar.pageType});
            }

        });


    })


    /*###########End Project 2###############*/

    .get('/act12',function(req,res){
        res.sendfile('html/act12/test.html');
    })

    .post('/login',function(req,res){
        var returnVal = {success:false};

        queryText = "SELECT * FROM users WHERE name='" + req.body.username + "';";

        queryDB(queryText,function(request,responds){
            if(responds.length > 0)
            {
                if(responds[0].name == req.body.username && responds[0].pass == req.body.password)
                {
                    returnVal = {success:true};
                }
            }
        });

        /*if(req.body.username == "admin" && req.body.password == "password")
        {
            req.session.user = req.body.username;

            returnVal = {success:true};
        }*/

        res.json(returnVal);

    })

    .post('/logout',function(req,res){
        var returnVal = {success:false};

        if(req.session.user)
        {
            req.session.destroy();

            returnVal = {success:true};
        }

        res.json(returnVal);

    })

    .get('/getServerTime',function(req,res,next){

        if(req.session.user)
        {
            next();
        }
        else
        {
            var returnVal = {success:false, message: "Access Denied"};
            res.status(401).json(returnVal);
        }
     },function(req,res){
        var time = new Date();

        var returnVal = {success: true, time: time};

        res.json(returnVal);
    })



    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function queryDB(queryText,callbackfunction)
{
    var client = new Client({connectionString: connectionString,});
    client.connect();

    console.log("query = " + queryText);

    client.query(queryText,function(err,results){

        if(err)
        {
            console.log("Error in query: ")
            console.log(err);
        }
        else
        {
            callbackfunction(null,results.rows);
        }

        client.end();
    });

}

