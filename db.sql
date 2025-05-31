-- CREATE TABLE users (
-- 	username varchar(20) not null,
--     password varchar(16) not null,
--     role varchar(5) not null,
--     UNIQUE (username)
-- );

-- SELECT * FROM users;

-- CREATE TABLE books (
-- 	book_id int unsigned auto_increment primary key,
-- 	title varchar(255) not null,
--     author varchar(255) not null,
--     synopsis mediumtext not null
-- );

-- CREATE TABLE copies (
-- 	copy_id int unsigned auto_increment primary key,
--     book_id int unsigned,
--     foreign key (book_id) references books(book_id)
-- );

-- CREATE TABLE borrowing (
-- 	copy_id int unsigned,
--     username varchar(20),
--     foreign key (copy_id) references copies(copy_id),
--     foreign key (username) references users(username)
-- );

-- ALTER TABLE users ADD PRIMARY KEY(username);

-- CREATE TABLE contact_queries (
-- 	name varchar(255) not null,
--     email varchar(255) not null,
--     message mediumtext not null
-- );

-- ALTER TABLE users MODIFY COLUMN password varchar(255);

-- ALTER TABLE contact_queries ADD timestamp varchar(255);

-- CREATE TABLE comments (
-- 	name varchar(255) not null,
--     email varchar(255) not null,
--     comment mediumtext not null,
--     rating int not null,
--     book_id int unsigned not null,
--     foreign key (book_id) references books(book_id)
-- );

-- select * from contact_queries;

-- SELECT * FROM comments;
    -- WHERE book_id = "1";
    
select * from comments;