package Projektbdio;

import Projektbdio.model.Notes;
import Projektbdio.repository.NotesRepository;
import Projektbdio.service.NotesService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@SpringBootTest
class NotesServiceTest {
    @Mock
    private NotesRepository noteRepo;
    private NotesService underTest;
    @Mock
    private Notes note;




    @BeforeEach
    void setUp() {
        underTest = new NotesService(noteRepo);
    }
}