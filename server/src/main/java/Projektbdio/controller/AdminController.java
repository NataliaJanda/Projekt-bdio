package Projektbdio.controller;


import Projektbdio.auth.AuthenticationService;
import Projektbdio.auth.RegisterRequest;
import Projektbdio.model.Accounts;
import Projektbdio.model.Role;
import Projektbdio.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority(ADMIN)")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    private final AdminService adminService;
    private final AuthenticationService authenticationService;

    @GetMapping("/accounts")
    public List<Map<String, Object>> getAccounts(){
        return adminService.getAccounts();
    }
    @GetMapping("/accounts/{id}")
    public Map<String, Object> getAccount(@PathVariable int id){ return adminService.getAccountById(id);}

    @PutMapping("/accounts")
    public Accounts putAccount(@RequestBody Accounts acc){
        return adminService.putAccount(acc);
    }
    @PostMapping("/accounts/add")
    public Accounts postAccount(@RequestBody RegisterRequest request){
        return adminService.postAccount(request);
    }
    @DeleteMapping("/accounts/{id}")
    public void deleteAccount(@PathVariable int id){
        adminService.deleteAccount(id);
    }
}
