create table users(
    id serial primary key,
    name varchar(120),
    pass varchar(250)
);

INSERT INTO users(name,pass)
VALUES(
    'admin',
    'password'
);
