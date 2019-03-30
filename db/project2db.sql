CREATE TABLE restaurants(
    ID      SERIAL PRIMARY KEY,
    Name    VARCHAR(120)
);


CREATE TABLE category(
    ID      SERIAL PRIMARY KEY,
    Name    VARCHAR(120)
);


CREATE TABLE rest_to_cat(
    ID        SERIAL PRIMARY KEY,
    rest_id   INT REFERENCES restaurants(ID) ON DELETE CASCADE,
    cat_id    INT REFERENCES category(ID) ON DELETE CASCADE
);


CREATE TABLE vote_lunch(
    ID              		SERIAL PRIMARY KEY,
    lunchDate        DATE,
    votingStart       DATE,
    votingEnd        DATE
);


CREATE TABLE rest_to_vote_lunch(
    ID               		 SERIAL PRIMARY KEY,
    rest_id               INT REFERENCES restaurants(ID) ON DELETE CASCADE,
    vote_lunch_id    INT REFERENCES vote_lunch(ID) ON DELETE CASCADE
);


CREATE TABLE vote(
    ID               		SERIAL PRIMARY KEY,
    userEmail        	VARCHAR(180),    /*This needs to unqie for each vote*/
    rest_id          	 INT REFERENCES restaurants(ID) ON DELETE CASCADE,
    vote_lunch_id    INT REFERENCES vote_lunch(ID) ON DELETE CASCADE
);


--Inserts

--restaurants
INSERT INTO restaurants(Name)
VALUES('Wendys');


INSERT INTO restaurants(Name)
VALUES('Burger King');


INSERT INTO restaurants(Name)
VALUES('Apollo');


INSERT INTO restaurants(Name)
VALUES('McDonald');


INSERT INTO restaurants(Name)
VALUES('KFC');


INSERT INTO restaurants(Name)
VALUES('Taco Bell');


--category
INSERT INTO category(Name)
VALUES('Burgers');


INSERT INTO category(Name)
VALUES('Chicken');


INSERT INTO category(Name)
VALUES('Mexican');


--rest_to_cat
INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'KFC'),
	(SELECT ID FROM category WHERE Name = 'Chicken')
);


INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Wendys'),
	(SELECT ID FROM category WHERE Name = 'Burgers')
);


INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Taco Bell'),
	(SELECT ID FROM category WHERE Name = 'Mexican')
);


INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'McDonald'),
	(SELECT ID FROM category WHERE Name = 'Burgers')
);


INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Apollo'),
	(SELECT ID FROM category WHERE Name = 'Burgers')
);


INSERT INTO rest_to_cat(rest_id,cat_id)
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM category WHERE Name = 'Burgers')
);


--vote_lunch
INSERT INTO vote_lunch(lunchDate,votingStart,votingEnd)
VALUES(
	'2019-03-28',
	'2019-03-25',
	'2019-03-28'
);


INSERT INTO vote_lunch(lunchDate,votingStart,votingEnd)
VALUES(
	'2019-02-28',
	'2019-02-25',
	'2019-02-28'
);



INSERT INTO vote_lunch(lunchDate,votingStart,votingEnd)
VALUES(
	'2019-04-18',
	'2019-04-15',
	'2019-04-18'
);


--rest_to_vote_lunch
INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'McDonald'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Taco Bell'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Apollo'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Wendys'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Apollo'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'KFC'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);


INSERT INTO rest_to_vote_lunch(rest_id,vote_lunch_id )
VALUES(
    (SELECT ID FROM restaurants WHERE Name = 'Wendys'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);


--vote

--2019-04-18
INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'bob@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Wendys'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'dave@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Wendys'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'harry@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'KFC'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-04-18')
);

--2019-03-28
INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'bob@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'dave@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'harry@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Taco Bell'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-03-28')
);


--2019-02-28
INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'dave@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Burger King'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'bob@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Taco Bell'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);


INSERT INTO vote(userEmail,rest_id,vote_lunch_id )
VALUES(
	'harry@noemail.com',
    (SELECT ID FROM restaurants WHERE Name = 'Taco Bell'),
	(SELECT ID FROM vote_lunch  WHERE lunchDate = '2019-02-28')
);



--Query

--Get all restaurants
SELECT * FROM restaurants;

--Get all voting
SELECT * FROM vote_lunch;

--Get all category
SELECT * FROM category;

--Get all restaurants by category
SELECT restaurants.ID, restaurants.Name
FROM category
JOIN rest_to_cat
ON rest_to_cat.cat_id = category.ID
JOIN restaurants
ON restaurants.ID = rest_to_cat.rest_id
WHERE category.Name = '';


--Get all restaurants and category by restaurants id
SELECT restaurants.ID, restaurants.Name,
STRING_AGG(category.id::CHARACTER VARYING, ',') AS cat_id,
STRING_AGG(category.name, ',') AS cat_name
FROM category
JOIN rest_to_cat
ON rest_to_cat.cat_id = category.ID
JOIN restaurants
ON restaurants.ID = rest_to_cat.rest_id
WHERE restaurants.ID = '2'
GROUP BY restaurants.ID;


--Get all restaurants and category
SELECT restaurants.ID, restaurants.Name,
STRING_AGG(category.id::CHARACTER VARYING, ',') AS cat_id,
STRING_AGG(category.name, ',') AS cat_name
FROM category
JOIN rest_to_cat
ON rest_to_cat.cat_id = category.ID
JOIN restaurants
ON restaurants.ID = rest_to_cat.rest_id
GROUP BY restaurants.ID;


--Get all restaurants in vote
SELECT restaurants.ID, restaurants.Name,
vote_lunch.lunchDate,vote_lunch.votingStart, vote_lunch.votingEnd
FROM rest_to_vote_lunch
JOIN vote_lunch
ON vote_lunch.ID = rest_to_vote_lunch.vote_lunch_id
JOIN restaurants
ON restaurants.ID = rest_to_vote_lunch.rest_id
WHERE vote_lunch.ID = '';


--Get all votes
SELECT vote.userEmail, vote.rest_id, vote.vote_lunch_id, restaurants.Name,
vote_lunch.lunchDate,vote_lunch.votingStart, vote_lunch.votingEnd
FROM vote
JOIN vote_lunch
ON vote_lunch.ID = vote.vote_lunch_id
JOIN restaurants
ON restaurants.ID = vote.rest_id
WHERE vote.vote_lunch_id = '';

--Get all create Vote
SELECT vl.ID AS vote_id, vl.lunchDate,
vl.votingStart ,vl.votingEnd,
STRING_AGG(r.id::CHARACTER VARYING, ',') AS rest_id,
STRING_AGG(r.name, ',') AS rest_name
FROM vote_lunch vl
JOIN rest_to_vote_lunch reslunch
ON reslunch.vote_lunch_id  = vl.ID
JOIN restaurants r
ON r.ID = reslunch.rest_id
WHERE vl.id = '1'
GROUP BY vl.ID;


--Get Votes
SELECT v.ID, v.userEmail, v.rest_id, v.vote_lunch_id,
r.name
FROM vote v
JOIN restaurants r
ON r.id = v.rest_id
WHERE v.vote_lunch_id = '3';

