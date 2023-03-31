package Projektbdio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notes")
@Getter
@Setter
public class Notes {
    @Id
    private int note_id;
    private String title;
    private String content;
    private LocalDateTime creation_date;
    private int account_id;

    private LocalDateTime modification_date;
    private String url_address;
    private boolean tag;

}