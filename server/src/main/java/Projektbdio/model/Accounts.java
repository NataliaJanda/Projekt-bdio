package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
@Getter
@Setter
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int account_id;
    private String user_name;
    private String password;
    private String email;
    private LocalDate register_date;
    private int account_type_id;
    private boolean activated;
    private String url_activation;

    @OneToMany
    @JoinColumn(name = "account_id")
    private List<Notes> Notes;
}
