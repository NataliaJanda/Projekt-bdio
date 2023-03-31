package Projektbdio.controller;

import Projektbdio.model.Notes;
import Projektbdio.service.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotesController {
    public final NotesService notesService;
    @GetMapping("/Notes")
    public List<Notes> getNotes()
    {
        return notesService.getNotes();
    }
    @GetMapping("/Notes/{id}")
    public Notes getNote(@PathVariable int id)
    {
        return notesService.getNote(id);
    }

}
