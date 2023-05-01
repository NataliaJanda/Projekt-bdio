package Projektbdio.DTO;

import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonCreator;
public record TagDTO(
@JsonValue        
String name
) {
    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)     public static TagDTO fromString(String name) {         return new TagDTO(name);     }
}
