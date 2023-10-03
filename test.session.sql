--@block
CREATE TABLE user (
    u_email VARCHAR (50) NOT NULL UNIQUE,
    u_name VARCHAR (50) PRIMARY KEY,
    pass TEXT NOT NULL,
    p_id TEXT,
);