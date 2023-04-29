package Projektbdio.Mapper;

import Projektbdio.DTO.NotesDTO;
import Projektbdio.model.Notes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotesDTOMapper  implements Function<Notes, NotesDTO> {
    private final TagDTOMapper tagDTOMapper;
    @Override
    public NotesDTO apply(Notes note){
        return new NotesDTO(
                note.getNoteId(),
                note.getTitle(),
                note.getContent(),
                note.getAccounts().getNameUser(),
                note.getModification_date(),
                note.getUrl_address(),
                note.isFavorite(),
                note.getCategory(),
                note.getTags()
                        .stream()
                        .map(tagDTOMapper)
                        .collect(Collectors.toList())

        );
    }
}
