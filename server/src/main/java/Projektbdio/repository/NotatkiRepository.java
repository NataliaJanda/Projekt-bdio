package Projektbdio.repository;

import Projektbdio.model.Notatki;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotatkiRepository extends JpaRepository<Notatki, Integer> {


}
