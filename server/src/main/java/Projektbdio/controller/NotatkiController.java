package Projektbdio.controller;

import Projektbdio.model.Notatki;
import Projektbdio.service.NotatkiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotatkiController {
    private  final NotatkiService notatkiService;
    @GetMapping("/Notatki")
    public List<Notatki> getNotatki(){
        return notatkiService.getNotatki();
    }

    @GetMapping("/Notatki/{id}")
    public Notatki getSingleNotatki(@PathVariable int id){
        return notatkiService.getSingleNotatka(id);

    }



}
