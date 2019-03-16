const express = require('express')
const path = require('path')
const url = require('url')
const { Pool, Client } = require('pg')
const connectionString = 'postgres://wmogwwdzthguoj:f5a8a72f73a9f52bc2f92dd44c8bac1c482a7cb56f97519e1c9b09492f91f751@ec2-54-204-13-34.compute-1.amazonaws.com:5432/d865mrc436havr'
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'html')))
    .use(express.static(path.join(__dirname, 'prove')))
    .use(express.static(path.join(__dirname, 'project')))
    .set('views', path.join(__dirname, 'views'))
    .set('views', path.join(__dirname, 'prove'))
    .set('views', path.join(__dirname, 'project'))
    .set('view engine', 'ejs')

    /*###########Project 2###############*/
    .get('/project2',(req,res) => res.sendfile('project/index.html'))
    .get('/restaurants',function(req,res){

        var myVar = url.parse(req.url,true).query;
        var queryText = "SELECT * FROM restaurants";

        if(myVar.id != null)
        {
            queryText += " WHERE id='" + myVar.id + "';";
        }
        else
        {
            queryText += ";";
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

    /*###########End Project 2###############*/
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function queryDB(queryText,callbackfunction)
{
    var client = new Client({connectionString: connectionString,});
    client.connect();

    console.log(queryText);

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

