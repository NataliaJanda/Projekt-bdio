package Projektbdio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Confirmation_token")
@Getter
@Setter
public class Confirmation_token {
    @Id
    private int id;
    private String token;
    private LocalDateTime created_at;
    private LocalDateTime expires_at;
    private LocalDateTime confirmed_at;
    private int account_id;
}
