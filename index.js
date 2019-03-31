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

            console.log(queryRes);

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

                if(myVar.cats && myVar.cats != "")
                {
                    var catArray = myVar.cats.split(",");
                    console.log(catArray);
                    for(j = 0; j < catArray.length; j++)
                    {
                        queryText += "INSERT INTO rest_to_cat(rest_id,cat_id)\
                        VALUES(\
                        (SELECT ID FROM restaurants WHERE Name ='" + myVar.name + "'),\
                        '" + catArray[j] + "');";
                    }
                }

            }
            else if(myVar.addType == "create vote")
            {
                queryText += "vote_lunch(lunchDate,votingStart,votingEnd) VALUES\
                                ('" + myVar.lunchDate + "','"
                                    + myVar.votingStart + "','"
                                    + myVar.votingEnd + "');";

                if(myVar.rest && myVar.rest != "")
                {
                    var restArray = myVar.rest.split(",");
                    console.log(restArray);
                    for(j = 0; j < restArray.length; j++)
                    {
                        queryText += "INSERT INTO rest_to_vote_lunch(vote_lunch_id,rest_id)\
                        VALUES(\
                        (SELECT ID FROM vote_lunch WHERE lunchDate ='" + myVar.lunchDate + "'),\
                        '" + restArray[j] + "');";
                    }
                }

            }
            else if(myVar.addType == "vote")
            {
                queryText += "vote(userEmail,rest_id,vote_lunch_id) VALUES\
                                ('" + myVar.email + "','"
                                    + myVar.restId + "','"
                                    + myVar.vlunchId + "');";
            }
        }




        queryDB(queryText,function(err,queryRes){

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                res.status(200).json({pageType:myVar.addType,page:myVar.addType});
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
            else if(myVar.removeType == "create vote")
            {
                queryText += "vote_lunch WHERE ID ='" + myVar.id + "';";
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
                res.status(200).json({cats:queryRes,page:myVar.pageType,pageType:myVar.pageType});
            }

        });


    })
    .get('/edit',function(req,res){

        var myVar = url.parse(req.url,true).query;
        console.log(myVar);
        var queryText = "UPDATE ";

        if(myVar.addType != null)
        {
            if(myVar.addType == "restaurants")
            {
                queryText += "restaurants SET name = '" + myVar.name + "'\
                              WHERE id='" + myVar.id + "';";
                queryText += "DELETE FROM rest_to_cat WHERE rest_id='" + myVar.id + "';";

                if(myVar.cats && myVar.cats != "")
                {
                    var catArray = myVar.cats.split(",");
                    console.log(catArray);
                    for(j = 0; j < catArray.length; j++)
                    {
                        queryText += "INSERT INTO rest_to_cat(rest_id,cat_id)\
                        VALUES(\
                        (SELECT ID FROM restaurants WHERE Name ='" + myVar.name + "'),\
                        '" + catArray[j] + "');";
                    }


                }
            }
            else if(myVar.addType == "create vote")
            {
                queryText += "vote_lunch SET lunchDate = '" + myVar.lunchDate + "',\
                               votingStart = '" + myVar.votingStart + "',\
                                votingEnd = '" + myVar.votingEnd + "'\
                              WHERE id='" + myVar.id + "';";
                queryText += "DELETE FROM rest_to_vote_lunch WHERE vote_lunch_id ='" + myVar.id + "';";

                if(myVar.rest && myVar.rest != "")
                {
                    var restArray = myVar.rest.split(",");
                    console.log(restArray);
                    for(j = 0; j < restArray.length; j++)
                    {
                        queryText += "INSERT INTO rest_to_vote_lunch(vote_lunch_id,rest_id)\
                        VALUES(\
                        (SELECT ID FROM vote_lunch WHERE lunchDate ='" + myVar.lunchDate + "'),\
                        '" + restArray[j] + "');";
                    }
                }
            }
        }


        queryDB(queryText,function(err,queryRes){

            if(err || queryRes == null)
            {
                res.status(500).json({success:false,data:err});
            }
            else
            {
                res.status(200).json({success:true,pageType:myVar.addType});
            }

        });


    })

    .get('/createvote',function(req,res){

        var myVar = url.parse(req.url,true).query;
        var queryText = "SELECT vl.ID AS vote_id, vl.lunchDate,\
                        vl.votingStart ,vl.votingEnd,\
                        STRING_AGG(r.id::CHARACTER VARYING, ',') AS rest_id,\
                        STRING_AGG(r.name, ',') AS rest_name\
                        FROM vote_lunch vl\
                        JOIN rest_to_vote_lunch reslunch\
                        ON reslunch.vote_lunch_id  = vl.ID\
                        JOIN restaurants r\
                        ON r.ID = reslunch.rest_id";

        if(myVar.id != null)
        {
            queryText += " WHERE vl.ID='" + myVar.id + "'\
                           GROUP BY vl.ID ORDER BY vl.lunchDate;";
        }
        else
        {
            queryText += " GROUP BY vl.ID ORDER BY vl.lunchDate;";
        }

        queryDB(queryText,function(err,queryRes){

            console.log(queryRes);

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

    .get('/results',function(req,res){

        var myVar = url.parse(req.url,true).query;
        var queryText = "";

        if(myVar.id != null)
        {
            queryText += " SELECT v.ID, v.userEmail, v.rest_id, v.vote_lunch_id,\
                            r.name\
                            FROM vote v\
                            JOIN restaurants r\
                            ON r.id = v.rest_id\
                            WHERE v.vote_lunch_id ='" + myVar.id + "';";
        }
        else
        {
            queryText = "SELECT vl.ID AS vote_id, vl.lunchDate,\
                vl.votingStart ,vl.votingEnd,\
                STRING_AGG(r.id::CHARACTER VARYING, ',') AS rest_id,\
                STRING_AGG(r.name, ',') AS rest_name\
                FROM vote_lunch vl\
                JOIN rest_to_vote_lunch reslunch\
                ON reslunch.vote_lunch_id  = vl.ID\
                JOIN restaurants r\
                ON r.ID = reslunch.rest_id GROUP BY vl.ID;";
        }

        queryDB(queryText,function(err,queryRes){

            console.log(queryRes);

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

    .get('/vote',function(req,res){

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
                           GROUP BY restaurants.ID ORDER BY vl.lunchDate;";
        }
        else
        {
            queryText += " GROUP BY restaurants.ID ORDER BY vl.lunchDate;";
        }

        queryDB(queryText,function(err,queryRes){

            console.log(queryRes);

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

    console.log("query = " + queryText);

    client.query(queryText,function(err,results){

        if(err)
        {
            console.log("Error in query: ")
            console.log(err);
        }
        else
        {

            if(Array.isArray(results))
            {
                callbackfunction(null,{success:true});
            }
            else
            {
                callbackfunction(null,results.rows);
            }
        }

        client.end();
    });

}

