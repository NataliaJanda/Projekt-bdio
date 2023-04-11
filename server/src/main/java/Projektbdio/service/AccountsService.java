package Projektbdio.service;

import Projektbdio.model.Accounts;
import Projektbdio.repository.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsService {
    public final AccountsRepository accountsRepository;

    public List<Accounts> getAccounts() {return accountsRepository.findAll();}

    public Accounts getAccount(int id){return accountsRepository.findById(id).orElseThrow();}
    public Accounts postAccount(Accounts Acc)
    {
        return  accountsRepository.save(Acc);
    }
    public Accounts putAccount(Accounts Acc)
    {
        Accounts editedAcc = accountsRepository.findById(Acc.getAccount_id()).orElseThrow();
        editedAcc.setUser_name(Acc.getUser_name());
        editedAcc.setPassword(Acc.getPassword());//todo: hashowanie hasla?sprawdzenie
        editedAcc.setEmail(Acc.getEmail());
        return editedAcc;
    }
    public void deleteAccount(Accounts acc)
    {
        accountsRepository.delete(acc);
    }



}
