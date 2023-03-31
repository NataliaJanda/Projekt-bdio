package Projektbdio.controller;

import Projektbdio.model.Accounts;
import Projektbdio.service.AccountsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountsController {
    public final AccountsService accountsService;
    @GetMapping ("/accounts")
    public List<Accounts> getAccounts(){return accountsService.getAccounts();}
    @GetMapping("/accounts/{id}")
    public Accounts getAccount(@PathVariable int id){return accountsService.getAccount(id);}

}
