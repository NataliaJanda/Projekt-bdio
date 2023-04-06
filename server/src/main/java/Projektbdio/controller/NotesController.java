package Projektbdio.controller;

import Projektbdio.model.Notes;
import Projektbdio.service.NotesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotesController {
    public final NotesService notesService;
    @GetMapping("/api/v2/Notes")
    public List<Notes> getNotes()
    {
        return notesService.getNotes();
    }
    @GetMapping("/api/v2/Notes/{id}")
    public Notes getNote(@PathVariable int id)
    {
        return notesService.getNote(id);
    }
    @PostMapping("/api/v2/Notes")
    public Notes postNote(@RequestBody Notes note){return notesService.postNote(note);}
    @PutMapping("/api/v2/Notes")
    @Transactional
    public Notes putNote(@RequestBody Notes note){return notesService.putNote(note);}



}
