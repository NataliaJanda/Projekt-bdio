package Projektbdio.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

//todo:create do
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Accounts implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;
    @Column(name = "user_name")
    private String nameUser;
    private String password;
    private String email;
    private LocalDate register_date;
    private boolean activated;
    private String url_activation;

    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany
    @JoinColumn(name = "account_id")
    private List<Projektbdio.model.Notes> Notes;
    @ManyToOne
    @JoinColumn(name ="account_type_id")
    private Account_Type accountType;
    @OneToOne
    @JoinColumn(name = "account_id")
    private Confirmation_token confirmationToken;

    @OneToMany
    @JoinColumn(name="account_id")
    private List<Tags> tags;//todo:create dto for tag
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return activated;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return activated;
    }
}
