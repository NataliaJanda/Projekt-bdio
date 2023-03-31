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
}
