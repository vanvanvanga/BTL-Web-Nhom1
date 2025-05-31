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

