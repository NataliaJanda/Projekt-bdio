package Projektbdio.Mapper;

import Projektbdio.DTO.NotesDTO;
import Projektbdio.model.Notes;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class NotesDTOMapper  implements Function<Notes, NotesDTO> {
    @Override
    public NotesDTO apply(Notes note){
        return new NotesDTO(
                note.getNote_id(),
                note.getTitle(),
                note.getContent(),
                note.getAccounts().getNameUser(),
                note.getModification_date(),
                note.getUrl_address(),
                note.isFavorite(),
                note.getCategory()
        );
    }
}
