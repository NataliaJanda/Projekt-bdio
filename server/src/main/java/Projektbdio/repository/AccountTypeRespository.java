package Projektbdio.repository;


import Projektbdio.model.Account_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountTypeRespository extends JpaRepository <Account_Type,Integer> {


    Account_Type findByName(String Name);


}
