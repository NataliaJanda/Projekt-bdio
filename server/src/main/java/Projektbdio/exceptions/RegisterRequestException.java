package Projektbdio.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class RegisterRequestException extends RuntimeException {
    public HttpStatus status;
    public RegisterRequestException(String message) {
        super(message);
    }

    public RegisterRequestException(String message, HttpStatus status) {
        super(message);
        this.status = status;

    }
}
