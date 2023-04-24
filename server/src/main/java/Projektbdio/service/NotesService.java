package Projektbdio.service;

import Projektbdio.Mapper.NotesDTOMapper;
import Projektbdio.DTO.NotesDTO;
import Projektbdio.model.Accounts;
import Projektbdio.model.Category;
import Projektbdio.model.Notes;
import Projektbdio.repository.AccountsRepository;
import Projektbdio.repository.CategoryRepository;
import Projektbdio.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class NotesService {
    private final NotesRepository notesRepository;
    private final NotesDTOMapper notesDTOMapper;
    private final CategoryRepository categoryRepository;
    private final AccountsRepository accountsRepository;

    public List<NotesDTO> getNotes(String name){
       return notesRepository.findNotesByAccounts_NameUser(name)
               .stream()
               .map(notesDTOMapper)
               .collect(Collectors.toList());
    }

    public NotesDTO getNote(int id)
    {
        return notesRepository.findById(id)
                .map(notesDTOMapper)
                .orElseThrow();
    }
    public NotesDTO postNote(NotesDTO noteDTO)
    {
        Accounts accounts = accountsRepository.findByNameUser(noteDTO.accountName());
        Notes note = new Notes();
        Category category = categoryRepository.findByName(noteDTO.category().getName()).orElseThrow();

        note.setNote_id(noteDTO.id());
        note.setTitle(noteDTO.title());
        note.setContent(noteDTO.content());
        note.setCategory(category);
        note.setUrl_address(noteDTO.url_address());
        note.setFavorite(note.isFavorite());
        note.setAccounts(accounts);
        note.setCreation_date(LocalDateTime.now());
        note.setModification_date(LocalDateTime.now());


        notesRepository.save(note);
        return noteDTO;
    }
    public NotesDTO putNote(NotesDTO note)
    {
        Category category = categoryRepository.findByName(note.category().getName()).orElseThrow();
        Notes noteToUpdate = notesRepository.findById(note.id()).orElseThrow();

        noteToUpdate.setContent(note.content());
        noteToUpdate.setTitle(note.title());
        noteToUpdate.setModification_date(LocalDateTime.now());
        noteToUpdate.setUrl_address(note.url_address());
        noteToUpdate.setCategory(category);
        noteToUpdate.setFavorite(note.favorite());

        notesRepository.save(noteToUpdate);
        return note;
    }


    public void deleteNote(NotesDTO note) {
        notesRepository.deleteById(note.id());
    }
}
