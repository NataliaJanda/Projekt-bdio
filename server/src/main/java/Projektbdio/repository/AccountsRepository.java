package Projektbdio.repository;

import Projektbdio.model.Accounts;
import Projektbdio.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Integer> {
}
