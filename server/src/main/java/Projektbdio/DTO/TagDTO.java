package Projektbdio.DTO;

import com.fasterxml.jackson.annotation.JsonValue;

public record TagDTO(
        @JsonValue
        String name
) {
}
