CREATE TABLE Users
(
	userID INT auto_increment,
	username VARCHAR(30) NOT NULL,
	mail VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	image VARCHAR(100) NULL,
	CONSTRAINT Users_pk
		PRIMARY KEY (userID)
);

CREATE unique index Users_username_uindex
	ON Users (username);