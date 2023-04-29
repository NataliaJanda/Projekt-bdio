package Projektbdio.Mapper;

import Projektbdio.DTO.TagDTO;
import Projektbdio.model.Tags;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TagDTOMapper implements Function<Tags, TagDTO> {
    @Override
    public TagDTO apply(Tags tags){
        return new TagDTO(
                tags.getDescription()
        );
    }

}
