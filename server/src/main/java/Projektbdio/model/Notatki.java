package Projektbdio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Table(name = "Notatki")
@Getter
@Setter
public class Notatki {
    @Id
    private int id_notatki;
    private String tytul;
    private String tresc;
    private LocalDate dataUtworzenia;
    private int id_dostepu;
    private int id_kategorii;
    private int id_autora;

    private LocalDate dataModyfikacji;

    private String adres_url;


}
