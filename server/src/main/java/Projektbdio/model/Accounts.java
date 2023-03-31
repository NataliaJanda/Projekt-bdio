package Projektbdio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;
@Entity
@Table(name = "accounts")
@Getter
@Setter
public class Accounts {
    @Id
    private int account_id;
    private String user_name;
    private String password;
    private String email;
    private LocalDate register_date;
    private int account_type_id;
    private boolean activated;
    private String url_activation;
}
