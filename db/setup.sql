CREATE TABLE Users (
  userID INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY(userID)
);

CREATE TABLE Posts (
  postID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image BLOB NOT NULL,
  authorID INT NOT NULL,
  created DATETIME NOT Null,
  PRIMARY KEY(postID),
  FOREIGN KEY(authorID) REFERENCES Users(userID)
);