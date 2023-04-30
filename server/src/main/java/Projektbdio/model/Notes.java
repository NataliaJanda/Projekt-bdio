package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private int noteId;
    private String title;
    private String content;
    private LocalDateTime creationDate;
    private LocalDateTime modification_date;
    private String url_address;
    private boolean favorite;
    @ManyToOne
    @JoinColumn(name = "Category_id")
    private Category category;//todo:create dto for cateory
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Accounts accounts;
    @OneToMany()
    @JoinColumn(name = "note_id")
    private List<Tags> Tags;//todo:create dto for tag

}