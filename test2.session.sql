CREATE TABLE user (
    u_email VARCHAR (50) NOT NULL UNIQUE,
    u_name VARCHAR (50) PRIMARY KEY,
    pass TEXT NOT NULL
)

--@BLOCK

DROP TABLE user;

--@block

DESC YASHSOJITRASU_pokemon
--@BLOCK

INSERT INTO user VALUES ("yashsojitra@email.com","YASHSO","9979");
INSERT INTO user VALUES ("yashsojitra@e.com","YASHSOJIT","9979");
INSERT INTO user VALUES ("yashsojitra@l.com","YASHSOJ","9979");


--@BLOCK

SELECT * FROM user;


--@block
UPDATE user SET p_id = '{"list":[]}' WHERE u_name LIKE 'YASHSOJITRASU';

--@block

SELECT * FROM user

--@block

SELECT u_email FROM user WHERE u_email LIKE 'A@b.com';

--@block

SELECT pass FROM user WHERE u_name LIKE 'Yash';

--@block
SELECT p_id FROM user WHERE p_id IS NOT NULL


--@BLOCK
DROP TABLE YASHSOJITRASU_pokemon

--@block

ALTER TABLE user ADD u_id INT NOT NULL AUTO INCREMENT UNIQUE;

--@block

CREATE TABLE YASHSOJITRASU_pokemon (
    pokemon_id INT PRIMARY KEY,
    pokemon_name VARCHAR (50) NOT NULL
)

--@block

CREATE TABLE YASHSOJITRASU_friends (
    u_name VARCHAR(50) NOT NULL
)

--@block

INSERT INTO YASHSOJITRASU_pokemon VALUES (1, "bulbasaur");

--@block

SELECT * FROM user;

--@block

DELETE FROM user WHERE u_name LIKE 'yashsojitra97';

--@block

SELECT IF( EXISTS(
             SELECT *
             FROM INFORMATION_SCHEMA.TABLES
           WHERE TABLE_NAME = 'yash_pokemon'), 1, 0);