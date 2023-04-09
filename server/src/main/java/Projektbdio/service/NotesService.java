package Projektbdio.service;

import Projektbdio.model.Notes;
import Projektbdio.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotesService {
    public final NotesRepository notesRepository;

    public List<Notes> getNotes(){
       return notesRepository.findAll();
    }

    public Notes getNote(int id)
    {
        return notesRepository.findById(id).orElseThrow();
    }
    public Notes postNote(Notes note)
    {
        note.setCreation_date(LocalDateTime.now());
        note.setModification_date(LocalDateTime.now());
        return  notesRepository.save(note);
    }
    public Notes putNote(Notes note)
    {
        Notes noteToUpdate = notesRepository.findById(note.getNote_id()).orElseThrow();
        noteToUpdate.setContent(note.getContent());
        noteToUpdate.setTitle(note.getTitle());
        noteToUpdate.setModification_date(LocalDateTime.now());
        noteToUpdate.setUrl_address(note.getUrl_address());
        return notesRepository.save(noteToUpdate);
    }


    public void deleteNote(Notes note) {
        notesRepository.deleteById(note.getNote_id());
    }
}
