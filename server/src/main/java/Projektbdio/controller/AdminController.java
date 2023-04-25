package Projektbdio.controller;


import Projektbdio.auth.AuthenticationService;
import Projektbdio.model.Accounts;
import Projektbdio.model.Role;
import Projektbdio.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority(ADMIN)")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    private final AdminService adminService;
    private final AuthenticationService authenticationService;

    @GetMapping("/accounts")
    public List<Accounts> getAccounts(){
        return adminService.getAccounts();
    }
    @GetMapping("/accounts/{id}")
    public Accounts getAccount(@PathVariable int id){
        return adminService.getAccount(id);
    }
    @PutMapping("/accounts")
    public Accounts putAccount(@RequestBody Accounts acc){
        return adminService.putAccount(acc);
    }
    @PostMapping("/accounts/add")
    public Accounts postAccount(@RequestBody Accounts acc){
        return adminService.postAccount(acc);
    }
    @DeleteMapping("/accounts/{id}")
    public void deleteAccount(@PathVariable int id){
        adminService.deleteAccount(id);
    }
}
