package Projektbdio.controller;

import Projektbdio.DTO.NotesDTO;
import Projektbdio.service.NotesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class NotesController {
    public final NotesService notesService;
    @GetMapping("/api/v2/{userName}/Notes")
    public List<NotesDTO> getNotes(@PathVariable String userName)
    {
        return notesService.getNotes(userName);
    }
    @GetMapping("/api/v2/Notes/{id}")
    public NotesDTO getNote(@PathVariable int id)
    {
        return notesService.getNote(id);
    }
    @PostMapping("/api/v2/Notes")
    @Transactional
    public NotesDTO postNote(@RequestBody NotesDTO note){return notesService.postNote(note);}
    @PutMapping("/api/v2/Notes")
    @Transactional
    public NotesDTO putNote(@RequestBody NotesDTO note){return notesService.putNote(note);}

    @DeleteMapping("/api/v2/Notes")
    public void delNote(@RequestBody NotesDTO noteDTO){notesService.deleteNote(noteDTO);}



}
