package Projektbdio.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String user_name;
    private String password;
    private String email;
    private LocalDate register_date;

    private String accountTypeName;
}
