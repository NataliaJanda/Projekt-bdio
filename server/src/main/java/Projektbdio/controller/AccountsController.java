package Projektbdio.controller;

import Projektbdio.auth.AuthenticationService;
import Projektbdio.model.Accounts;
import Projektbdio.service.AccountsService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class AccountsController {
    public final AccountsService accountsService;
    public final AuthenticationService authenticationService;
    @GetMapping ("/api/v2/accounts")
    public List<Accounts> getAccounts(){return accountsService.getAccounts();}
    @GetMapping("/api/v2/accounts/{id}")
    public Accounts getAccount(@PathVariable int id){return accountsService.getAccount(id);}
    @PutMapping("/api/v2/accounts")
    public Accounts putAccount(@RequestBody Accounts acc)
    {
        return accountsService.putAccount(acc);
    }
    @Transactional
    @PostMapping("/api/v2/accounts")
    public Accounts postAccount(@RequestBody Accounts acc) {return accountsService.postAccount(acc);}
    @DeleteMapping("/api/v2/accounts")
    public void  deleteAccount(@RequestBody Accounts acc)
    {
        accountsService.deleteAccount(acc);
    }
    @GetMapping("/activation/{token}")
    public void confirmToken(@PathVariable String token){
        authenticationService.confirmToken(token);
    }
}
