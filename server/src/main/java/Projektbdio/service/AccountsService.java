package Projektbdio.service;

import Projektbdio.email.EmailToken.ConfirmationToken;
import Projektbdio.email.EmailToken.ConfirmationTokenService;
import Projektbdio.exceptions.RegisterRequestException;
import Projektbdio.model.Accounts;
import Projektbdio.repository.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountsService {
    public final AccountsRepository accountsRepository;
    public final ConfirmationTokenService confirmationTokenService;
    private final PasswordEncoder passwordEncoder;
    public List<Accounts> getAccounts() {return accountsRepository.findAll();}
    public Accounts getAccount(int id){return accountsRepository.findById(id).orElseThrow();}
    public Accounts postAccount(Accounts Acc)
    {
        return  accountsRepository.save(Acc);
    }
    public Accounts putAccount(Accounts Acc)
    {
        Accounts editedAcc = accountsRepository.findById(Acc.getAccountId()).orElseThrow();
        editedAcc.setNameUser(Acc.getNameUser());
        editedAcc.setPassword(Acc.getPassword());
        editedAcc.setEmail(Acc.getEmail());
        return editedAcc;
    }
    public void deleteAccount(Accounts acc)
    {
        accountsRepository.delete(acc);
    }

    public String signUpUser(Accounts accounts) {

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                accounts
        );
        confirmationTokenService.saveConfirmationToken(
                confirmationToken);
        return token;
    }

    public int enableAccounts(String email) {
        return accountsRepository.enableAccounts(email);
    }

    public void editEmail(Accounts acc){
        Accounts editedAcc = accountsRepository.findByNameUser(acc.getNameUser());
        if(!editedAcc.getEmail().equals(acc.getEmail())) {
            if (accountsRepository.existsByEmail(acc.getEmail())) {
                throw new RegisterRequestException("Email already exists", HttpStatus.BAD_REQUEST);
            }
        }
            editedAcc.setEmail(acc.getEmail());
        accountsRepository.save(editedAcc);
    }
    public void editPassword(Accounts acc){
        Accounts editedAcc = accountsRepository.findByNameUser(acc.getNameUser());
        editedAcc.setPassword(passwordEncoder.encode(acc.getPassword()));
        accountsRepository.save(editedAcc);
    }

    }