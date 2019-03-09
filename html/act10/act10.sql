CREATE TABLE Person(
    ID       SERIAL PRIMARY KEY,
    fname    VARCHAR(120),
    lname    VARCHAR(120),
    birthDay DATE
);

CREATE TABLE relationship(
    ID          SERIAL PRIMARY KEY,
    parent      INT REFERENCES Person(ID),
    child       INT REFERENCES Person(ID)
);

--Person
INSERT INTO Person(fname,lname,birthDay)
VALUES('Bob','Hulk','1984-05-28');


INSERT INTO Person(fname,lname,birthDay)
VALUES('Cindy','Hulk','1955-05-28');


INSERT INTO Person(fname,lname,birthDay)
VALUES('Dave','Hulk','2017-05-28');


--relationship
INSERT INTO relationship(parent, child)
VALUES(
    (SELECT ID FROM Person WHERE fname = 'Cindy'),
    (SELECT ID FROM Person WHERE fname = 'Bob')
);


INSERT INTO relationship(parent, child)
VALUES(
    (SELECT ID FROM Person WHERE fname = 'Bob'),
    (SELECT ID FROM Person WHERE fname = 'Dave')
);


