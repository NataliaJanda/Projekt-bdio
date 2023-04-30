package Projektbdio.repository;

import Projektbdio.model.Notes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository< Notes , Integer> {
    @Transactional
    @Query("SELECT n FROM Notes n JOIN FETCH n.accounts a JOIN FETCH n.category c LEFT JOIN FETCH n.Tags WHERE a.nameUser = :name")
    List<Notes> findNotesByAccounts_NameUser(@Param("name") String name);
    
    Notes findByCreationDate(LocalDateTime CreationDate);
    
    @Transactional
    void deleteNotesByAccounts_AccountId(int id);
}
