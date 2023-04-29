package Projektbdio.service;

import Projektbdio.email.EmailToken.ConfirmationToken;
import Projektbdio.email.EmailToken.ConfirmationTokenService;
import Projektbdio.model.Accounts;
import Projektbdio.repository.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountsService {
    public final AccountsRepository accountsRepository;
    public final ConfirmationTokenService confirmationTokenService;
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
        editedAcc.setPassword(Acc.getPassword());//todo: hashowanie hasla?sprawdzenie
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

    }
