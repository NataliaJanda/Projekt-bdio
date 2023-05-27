package Projektbdio.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UrlRequestException extends RuntimeException {
    public HttpStatus status;
    public UrlRequestException(String message){ super(message);}
    public UrlRequestException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }
}
