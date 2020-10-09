CREATE TABLE Users
(
	userID INT auto_increment,
	username VARCHAR(30) NOT NULL,
	mail VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	image VARCHAR(500) NULL,
	CONSTRAINT Users_pk
		PRIMARY KEY (userID)
);

CREATE TABLE Posts
(
	postID INT auto_increment,
	title VARCHAR(50) NOT NULL,
	image VARCHAR(500) NOT NULL,
	userID INT NOT NULL,
	CONSTRAINT Users_pk
		PRIMARY KEY (userID)
	CONSTRAINT Posts_Users_userID_fk
		FOREIGN KEY (userID) REFERENCES Users (userID);
);

CREATE TABLE Likes
(
	likeID INT auto_increment
	postID INT NOT NULL,
	userID INT NOT NULL,
	CONSTRAINT Lieks_pk
		PRIMARY KEY (likeID)
	CONSTRAINT Likes_Users_userID_fk
		FOREIGN KEY (userID) REFERENCES Users (userID);
	CONSTRAINT Likes_Posts_postID_fk
		FOREIGN KEY (postID) REFERENCES Posts (postID);
);