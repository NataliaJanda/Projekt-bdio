package Projektbdio.service;

import Projektbdio.auth.AuthenticationResponse;
import Projektbdio.auth.JwtService;
import Projektbdio.auth.RegisterRequest;
import Projektbdio.email.EmailSender;
import Projektbdio.email.EmailToken.ConfirmationTokenService;
import Projektbdio.exceptions.RegisterRequestException;
import Projektbdio.model.Account_Type;
import Projektbdio.model.Accounts;
import Projektbdio.model.Role;
import Projektbdio.repository.AccountTypeRespository;
import Projektbdio.repository.AccountsRepository;
import Projektbdio.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AccountsRepository accountsRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final PasswordEncoder passwordEncoder;
    private final AccountsService accountsService;
    private final JwtService jwtService;
    private final EmailSender emailSender;
    private final NotesRepository notesRepository;
    private final AccountTypeRespository accountTypeRespository;

    public List<Map<String, Object>> getAccounts(){
        return accountsRepository.getAccounts();
    }

    public Map<String, Object> getAccountById(int id){return accountsRepository.findAccountById(id);}
    public Accounts postAccount(RegisterRequest request) {
        Account_Type accountType = accountTypeRespository.findByName(request.getAccountTypeName());
        var user = Accounts.builder()
                .nameUser(request.getUser_name())
                .email(request.getEmail())
                .register_date(LocalDate.now())
                .accountType(accountType)
                .password(passwordEncoder.encode(request.getPassword()))
                .role((Role.USER))
                .build();
        if(accountsRepository.existsByEmail(request.getEmail()))
        {
            throw new RegisterRequestException("Email already exists", HttpStatus.BAD_REQUEST);
        }
        if(accountsRepository.existsByNameUser(request.getUser_name()))
        {
            throw new RegisterRequestException("Name already exists",HttpStatus.BAD_REQUEST);
        }
        accountsRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        String token = accountsService.signUpUser(user);

        String link = "http://localhost:8090/activation/" + token;

        user.setUrl_activation(link);

        emailSender.send(
                request.getEmail(),
                buildEmail(request.getUser_name(), link));
        AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
        return accountsRepository.save(user);
    }
    public Accounts putAccount(Accounts acc){
        Accounts editedAcc = accountsRepository.findById(acc.getAccountId()).orElseThrow();
        editedAcc.setNameUser(acc.getNameUser());
        editedAcc.setPassword(passwordEncoder.encode(acc.getPassword()));
        editedAcc.setEmail(acc.getEmail());
        editedAcc.setRole(acc.getRole());
        return accountsRepository.save(editedAcc);
    }
    public void deleteAccount(int id){
        accountsRepository.deleteToken(id);
        accountsRepository.deleteTag(id);
        notesRepository.deleteNotesByAccounts_AccountId(id);
        accountsRepository.deleteById(id);
    }
    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

}
