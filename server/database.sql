// dont forget ";"

-- create a database
CREATE DATABASE perntodo;

-- create a table
CREATE TABLE todo(
  todo_id  SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

-- check table items
SELECT * FROM todo;