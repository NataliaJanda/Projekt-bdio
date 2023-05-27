package Projektbdio.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class UrlExceptionHandler {
    @ExceptionHandler(value = {UrlRequestException.class})
    public ResponseEntity<Object> handleUrlException(UrlRequestException exception)
    {
        UrlException urlException = new UrlException(exception.getMessage(),
                exception.getStatus(),
                ZonedDateTime.now());
        return new ResponseEntity<>(urlException, exception.getStatus());
    }
}
