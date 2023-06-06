package Projektbdio.controller;

import Projektbdio.auth.AuthenticationService;
import Projektbdio.model.Accounts;
import Projektbdio.service.AccountsService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
    @GetMapping("/api/activation/{token}")
    public ModelAndView confirmToken(@PathVariable String token){
        authenticationService.confirmToken(token);
        return new ModelAndView("redirect:http://localhost");
    }
    @PutMapping("/api/v2/accounts/changeEmail")
    public void editEmail(@RequestBody Accounts acc)
    {
        accountsService.editEmail(acc);
    }
    @PutMapping("/api/v2/accounts/changePassword")
    public void changePassword(@RequestBody Accounts acc)
    {
        accountsService.editPassword(acc);
    }

}
