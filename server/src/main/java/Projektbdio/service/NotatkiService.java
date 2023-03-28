package Projektbdio.service;

import Projektbdio.model.Notatki;
import Projektbdio.repository.NotatkiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotatkiService {
    public final NotatkiRepository notatkiRepository;

    public List<Notatki> getNotatki(){
        return  notatkiRepository.findAll();
    }
    public Notatki getSingleNotatka(int id){
        return notatkiRepository.findById(id).orElseThrow();
    }



}
