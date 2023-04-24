package Projektbdio.DTO;

import Projektbdio.model.Category;
import java.time.LocalDateTime;

public record NotesDTO(
        Integer id,
        String title,
        String content,
        String accountName,
        LocalDateTime modificationDate,
        String url_address,
        boolean favorite,
        Category category

){
}
