package Projektbdio.service;

import Projektbdio.DTO.TagDTO;
import Projektbdio.Mapper.NotesDTOMapper;
import Projektbdio.DTO.NotesDTO;
import Projektbdio.exceptions.UrlRequestException;
import Projektbdio.model.Accounts;
import Projektbdio.model.Category;
import Projektbdio.model.Notes;
import Projektbdio.model.Tags;
import Projektbdio.repository.AccountsRepository;
import Projektbdio.repository.CategoryRepository;
import Projektbdio.repository.NotesRepository;
import Projektbdio.repository.TagsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.hibernate.Hibernate.map;


@Service
@RequiredArgsConstructor
public class NotesService {
    private final NotesRepository notesRepository;
    private final NotesDTOMapper notesDTOMapper;
    private final CategoryRepository categoryRepository;
    private final AccountsRepository accountsRepository;
    private final TagsRepository tagsRepository;

    public List<NotesDTO> getNotes(String name) {
        return notesRepository.findNotesByAccounts_NameUser(name)
                .stream()
                .map(notesDTOMapper)
                .collect(Collectors.toList());
    }

    public NotesDTO getNote(int id) {
        return notesRepository.findById(id)
                .map(notesDTOMapper)
                .orElseThrow();
    }

    public NotesDTO postNote(NotesDTO noteDTO) {
        Accounts accounts = accountsRepository.findByNameUser(noteDTO.accountName());
        Notes note = new Notes();
        if(notesRepository.existsByUrlAddress(noteDTO.url_address()))
        {
            throw new UrlRequestException("URL already exists", HttpStatus.BAD_REQUEST);
        }
        Category category = categoryRepository.findByName(noteDTO.category().getName()).orElseThrow();
        LocalDateTime time = LocalDateTime.now();
        note.setNoteId(noteDTO.id());
        note.setTitle(noteDTO.title());
        note.setContent(noteDTO.content());
        note.setCategory(category);
        note.setUrl_address(noteDTO.url_address());
        note.setFavorite(note.isFavorite());
        note.setAccounts(accounts);
        note.setCreationDate(time);
        note.setModification_date(time);


        notesRepository.save(note);
        Notes tagHelper = notesRepository.findByCreationDate(time);
        tagsRepository.deleteByNoteId(tagHelper.getNoteId());

        for (TagDTO temp : noteDTO.tags()) {
            Tags toSave = new Tags();
            toSave.setAccount_id(tagHelper.getAccounts().getAccountId());
            toSave.setNoteId(tagHelper.getNoteId());
            toSave.setDescription(temp.name());
            tagsRepository.save(toSave);
        }


        return noteDTO;
    }

    public NotesDTO putNote(NotesDTO note) {
        Category category = categoryRepository.findByName(note.category().getName()).orElseThrow();
        Notes noteToUpdate = notesRepository.findById(note.id()).orElseThrow();
        if (!noteToUpdate.getUrl_address().equals(note.url_address()))
        {
            if(notesRepository.existsByUrlAddress(note.url_address()))
            {
                throw new UrlRequestException("URL already exists", HttpStatus.BAD_REQUEST);
            }
        }
        tagsRepository.deleteByNoteId(noteToUpdate.getNoteId());

        noteToUpdate.setContent(note.content());
        noteToUpdate.setTitle(note.title());
        noteToUpdate.setModification_date(LocalDateTime.now());
        noteToUpdate.setUrl_address(note.url_address());
        noteToUpdate.setCategory(category);
        noteToUpdate.setFavorite(note.favorite());

        notesRepository.save(noteToUpdate);


        for (TagDTO temp : note.tags()) {
            Tags toSave = new Tags();

            toSave.setNoteId(noteToUpdate.getNoteId());
            toSave.setAccount_id(noteToUpdate.getAccounts().getAccountId());
            toSave.setDescription(temp.name());
            tagsRepository.save(toSave);
        }
        return note;
    }

    @Transactional
    public void deleteNote(NotesDTO note) {
        tagsRepository.deleteByNoteId(note.id());
        notesRepository.deleteById(note.id());
    }
    public NotesDTO getNoteByUrl(String url) {
        Notes notes = notesRepository.findByUrl(url);
        int id= notes.getNoteId();
        return notesRepository.findById(id)
                .map(notesDTOMapper)
                .orElseThrow();
    }
    public void postNoteByUrl(String url, Accounts loggedIn){
        Notes originalNote = notesRepository.findByUrl(url);
        Notes note = new Notes();
        Accounts accounts = accountsRepository.findByNameUser(loggedIn.getNameUser());
        note.setCategory(originalNote.getCategory());
        note.setContent(originalNote.getContent());
        note.setTitle(originalNote.getTitle());
        note.setAccounts(accounts);
        note.setModification_date(LocalDateTime.now());
        note.setCreationDate(originalNote.getCreationDate());
        String generatedUrl = UUID.randomUUID().toString();
        note.setUrl_address(generatedUrl);
        notesRepository.save(note);

        Tags toSave = new Tags();
        toSave.setAccount_id(accounts.getAccountId());
        toSave.setNoteId(note.getNoteId());
        toSave.setDescription("shared");
        tagsRepository.save(toSave);
    }
    public NotesDTO copyNotes(int id, Accounts loggedIn){
        Notes noteToCopy = notesRepository.findById(id).orElseThrow();
        Notes noteCopied = new Notes();
        Accounts accounts = accountsRepository.findByNameUser(loggedIn.getNameUser());
        noteCopied.setCategory(noteToCopy.getCategory());
        noteCopied.setContent(noteToCopy.getContent());
        noteCopied.setTitle(noteToCopy.getTitle());
        noteCopied.setAccounts(accounts);
        noteCopied.setModification_date(LocalDateTime.now());
        noteCopied.setCreationDate(LocalDateTime.now());
        String generatedUrl = UUID.randomUUID().toString();
        noteCopied.setUrl_address(generatedUrl);
        notesRepository.save(noteCopied);

        Tags toSave = new Tags();
        toSave.setAccount_id(accounts.getAccountId());
        toSave.setNoteId(noteCopied.getNoteId());
        toSave.setDescription("copied");
        tagsRepository.save(toSave);
        int id_note= noteCopied.getNoteId();
        return notesRepository.findById(id)
                .map(notesDTOMapper)
                .orElseThrow();
    }
}
