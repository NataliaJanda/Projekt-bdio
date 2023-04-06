package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int note_id;
    private String title;
    private String content;
    private LocalDateTime creation_date;
    private Integer category_id;
    private Integer account_id;
    private LocalDateTime modification_date;
    private String url_address;
    private boolean tag;

}