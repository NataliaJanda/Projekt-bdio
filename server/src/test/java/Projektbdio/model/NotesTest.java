package Projektbdio.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;


@SpringBootTest
class NotesTest {

    @Test
    public void testGettersAndSetters() {
        Notes note = new Notes();
        note.setTitle("Test Note");
        note.setContent("This is a test note.");
        LocalDateTime creationDate = LocalDateTime.now();
        note.setCreation_date(creationDate);
        note.setCategory_id(1);
        note.setAccount_id(2);
        note.setModification_date(LocalDateTime.now());
        note.setUrl_address("http://example.com");
        note.setTag(true);

        Assertions.assertEquals("Test Note", note.getTitle());
        Assertions.assertEquals("This is a test note.", note.getContent());
        Assertions.assertEquals(creationDate, note.getCreation_date());
        Assertions.assertEquals(1, note.getCategory_id());
        Assertions.assertEquals(2, note.getAccount_id());
        Assertions.assertNotNull(note.getModification_date());
        Assertions.assertEquals("http://example.com", note.getUrl_address());
        Assertions.assertTrue(note.isTag());


        note.setTitle("New Title");
        note.setContent("This is the new content.");
        LocalDateTime newModificationDate = LocalDateTime.now();
        note.setModification_date(newModificationDate);
        note.setCategory_id(null);
        note.setAccount_id(null);
        note.setUrl_address(null);
        note.setTag(false);

        Assertions.assertEquals("New Title", note.getTitle());
        Assertions.assertEquals("This is the new content.", note.getContent());
        Assertions.assertEquals(creationDate, note.getCreation_date());
        Assertions.assertNull(note.getCategory_id());
        Assertions.assertNull(note.getAccount_id());
        Assertions.assertEquals(newModificationDate, note.getModification_date());
        Assertions.assertNull(note.getUrl_address());
        Assertions.assertFalse(note.isTag());
    }
}