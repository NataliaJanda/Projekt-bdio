package Projektbdio.repository;

import Projektbdio.model.Accounts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Integer> {

    Optional<Accounts> findByEmail(String email);
    Accounts findByNameUser(String name);
    @Transactional
    @Modifying
    @Query(value = "UPDATE Accounts a " + "SET a.activated = true WHERE a.email = ?1")

    int enableAccounts(String email);
    boolean existsByEmail(String email);
    boolean existsByNameUser(String nameUser);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM Confirmation_token c WHERE c.account_id = :id")
    void deleteToken(@Param("id") int id);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM Tag c WHERE c.account_id = :id")
    void deleteTag(@Param("id") int id);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM Access c WHERE c.account_id = :id")
    void deleteAccess(@Param("id") int id);
}
