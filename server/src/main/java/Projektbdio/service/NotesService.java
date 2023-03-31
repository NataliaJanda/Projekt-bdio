package Projektbdio.service;

import Projektbdio.model.Notes;
import Projektbdio.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
