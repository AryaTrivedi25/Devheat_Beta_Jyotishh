CREATE TABLE user (
    u_email VARCHAR (50) NOT NULL UNIQUE,
    u_name VARCHAR (50) PRIMARY KEY,
    pass TEXT NOT NULL,
    p_id TEXT
)

--@block

DESC user

--@BLOCK

INSERT INTO user VALUES ("A@bbb.com","aaarya","efegwerfvbgqerwefsbgasdffasdvfrgtewfsdgrtewf","{\"list\":[]}");

--@block


--@block

SELECT * FROM user

--@block

SELECT u_email FROM user WHERE u_email LIKE 'A@b.com';

--@block

SELECT pass FROM user WHERE u_name LIKE 'Yash';