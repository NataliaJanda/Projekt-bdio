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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int note_id;
    private String title;
    private String content;
    private LocalDateTime creation_date;
    private LocalDateTime modification_date;
    private String url_address;
    private boolean favorite;


    @ManyToOne
    @JoinColumn(name = "Category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Accounts accounts;

}