package Projektbdio.repository;

import Projektbdio.model.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagsRepository extends JpaRepository<Tags,Integer> {
    void deleteByNoteId(int note_id);
}
