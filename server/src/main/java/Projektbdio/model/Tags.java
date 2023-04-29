package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Tags")
@Getter
@Setter
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tag_id;
    private int account_id;
    @Column(name = "note_id")
    private int noteId;
    private String description;
}
