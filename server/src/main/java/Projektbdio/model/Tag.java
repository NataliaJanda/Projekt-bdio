package Projektbdio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Tag")
@Getter
@Setter
public class Tag {
    @Id
    private int account_id;
    private int note_id;
    private String descripiton;
}
