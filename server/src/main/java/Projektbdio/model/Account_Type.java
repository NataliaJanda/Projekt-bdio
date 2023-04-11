package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Account_Type")
@Getter
@Setter
public class Account_Type {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int account_type_id;
    private String name;
    private int number_of_notes;
    private boolean url_edit;
}
