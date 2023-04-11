--Table Account_type
CREATE TABLE Account_Type(
                             account_type_id SERIAL PRIMARY KEY,
                             name VARCHAR(30) NOT NULL UNIQUE,
                             number_of_notes INT NOT NULL,
                             url_edit BOOLEAN NOT NULL DEFAULT FALSE
);

--Table Accounts
CREATE TABLE Accounts(
                         account_id SERIAL PRIMARY KEY,
                         user_name VARCHAR(100) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         email VARCHAR(100) NOT NULL UNIQUE,
                         role VARCHAR(50) NOT NULL,
                         register_date DATE NOT NULL,
                         account_type_id INT DEFAULT NULL,
                         activated BOOLEAN NOT NULL DEFAULT FALSE,
                         url_activation VARCHAR(100)
--                         FOREIGN KEY (account_type_id) REFERENCES Account_type(account_type_id)
);
-- --Table Category
CREATE TABLE Category(
                         category_id SERIAL PRIMARY KEY,
                         name VARCHAR(50) NOT NULL UNIQUE
);

--Table Access
CREATE TABLE Access(
                       account_id INT,
                       note_id INT,
                       accessibility INT,
                       FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

--Table Notes
CREATE TABLE Notes(
                      note_id SERIAL PRIMARY KEY,
                      title VARCHAR(40) NOT NULL,
                      content TEXT,
                      creation_date TIMESTAMP NOT NULL,
                      category_id INT,
                      account_id INT,
                      modification_date TIMESTAMP NOT NULL,
                      url_address VARCHAR(100) UNIQUE NOT NULL,
                      favorite BOOLEAN NOT NULL DEFAULT FALSE,
                      FOREIGN KEY (category_id) REFERENCES category(category_id),
                      FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

--Table Access_description
CREATE TABLE Access_description(
                                   accessibility_id SERIAL PRIMARY KEY,
                                   description VARCHAR(40) NOT NULL UNIQUE
);
CREATE TABLE Tag(
                    account_id INT,
                    note_id INT,
                    description VARCHAR(100) NOT NULL,
                    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
                    FOREIGN KEY (note_id) REFERENCES notes(note_id)
);
--ADD FOREIGN KEYS
ALTER TABLE Access ADD FOREIGN KEY (note_id) REFERENCES Notes(note_id);
ALTER TABLE Access ADD FOREIGN KEY (accessibility) REFERENCES Access_description(accessibility_id);
