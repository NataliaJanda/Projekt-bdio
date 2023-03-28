-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-03-25 12:28:21.579

-- tables
-- Table: Dostepnosc
CREATE TABLE Dostepnosc (
    id_dostepu int  NOT NULL,
    kto_moze_zobaczyc varchar(12)  NOT NULL,
    kto_moze_edytowac varchar(12)  NOT NULL,
    CONSTRAINT Dostepnosc_pk PRIMARY KEY (id_dostepu)
);

-- Table: Kategoria
CREATE TABLE Kategoria (
    id_kategorii int  NOT NULL,
    nazwa varchar(30)  NOT NULL,
    CONSTRAINT Kategoria_pk PRIMARY KEY (id_kategorii)
);

-- Table: Notatki
CREATE TABLE Notatki(
    id_notatki int  NOT NULL,
    tytul varchar(15)  NOT NULL,
    tresc text  NOT NULL,
    data_utworzenia date  NOT NULL,
    id_dostepu int  NOT NULL,
    id_kategorii int  NOT NULL,
    id_autora int  NOT NULL,
    data_modyfikacji date  NOT NULL,
    adres_url varchar(100)  NOT NULL,
    CONSTRAINT id_notatki PRIMARY KEY (id_notatki)
);


-- Table: Subskrypcja
CREATE TABLE Subskrypcja (
    id_subskrybcji int  NOT NULL,
    nazwa varchar(12)  NOT NULL,
    liczba_notatek varchar(10)  NOT NULL,
    koniec_notatki date  NOT NULL,
    edycja_url varchar(15)  NOT NULL,
    CONSTRAINT Subskrypcja_pk PRIMARY KEY (id_subskrybcji)
);

-- Table: Uzytkownicy
CREATE TABLE Uzytkownicy (
    id_uzytkownika int  NOT NULL,
    login varchar(30)  NOT NULL,
    haslo varchar(40)  NOT NULL,
    email varchar(100)  NOT NULL,
    data_rejestracji date  NOT NULL,
    id_subskrypcji int  NOT NULL,
    CONSTRAINT Uzytkownicy_pk PRIMARY KEY (id_uzytkownika)
);

-- foreign keys
-- Reference: Dostepnosc_Notatki (table: Notatki)
ALTER TABLE Notatki ADD CONSTRAINT Dostepnosc_Notatki
    FOREIGN KEY (id_dostepu)
    REFERENCES Dostepnosc (id_dostepu)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE;

-- Reference: Notatki_User (table: Notatki)
ALTER TABLE Notatki ADD CONSTRAINT Notatki_User
    FOREIGN KEY (id_autora)
    REFERENCES Uzytkownicy (id_uzytkownika)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE;

-- Reference: Przedmioty_Notatki (table: Notatki)
ALTER TABLE Notatki ADD CONSTRAINT Przedmioty_Notatki
    FOREIGN KEY (id_kategorii)
    REFERENCES Kategoria (id_kategorii)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE;

-- Reference: User_Subskrypcja (table: Uzytkownicy)
ALTER TABLE Uzytkownicy ADD CONSTRAINT User_Subskrypcja
    FOREIGN KEY (id_subskrypcji)
    REFERENCES Subskrypcja (id_subskrybcji)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE;

-- End of file.

