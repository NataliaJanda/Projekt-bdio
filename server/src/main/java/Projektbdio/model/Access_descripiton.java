package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Access_descripiton")
@Getter
@Setter
public class Access_descripiton {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int accessibility_id;
    private String descripiton;
}
