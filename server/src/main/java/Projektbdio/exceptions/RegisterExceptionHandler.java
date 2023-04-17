package Projektbdio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;
@ControllerAdvice
public class RegisterExceptionHandler {
    @ExceptionHandler(value = {RegisterRequestException.class})
    public ResponseEntity<Object> hadleRegisterException(RegisterRequestException exception)
    {
        RegisterException registerException = new RegisterException(exception.getMessage(),
                exception.getStatus(),
                ZonedDateTime.now());
        return new ResponseEntity<>(registerException, exception.getStatus());

    }

}
