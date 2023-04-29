package Projektbdio.repository;

import Projektbdio.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository< Notes , Integer> {

    List<Notes> findNotesByAccounts_NameUser(String name);
    Notes findByCreationDate(LocalDateTime CreationDate);
    void deleteNotesByAccounts_AccountId(int id);

}
