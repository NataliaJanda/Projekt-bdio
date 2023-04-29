package Projektbdio.repository;

import Projektbdio.model.Notes;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository< Notes , Integer> {

    List<Notes> findNotesByAccounts_NameUser(String name);
    @Transactional
    void deleteNotesByAccounts_AccountId(int id);
}
