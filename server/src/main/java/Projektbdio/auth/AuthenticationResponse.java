package Projektbdio.auth;

import Projektbdio.model.Role;
import lombok.*;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String userName;
    private String accountTypeName;
    private String urlToken;
    private Role role;
}
