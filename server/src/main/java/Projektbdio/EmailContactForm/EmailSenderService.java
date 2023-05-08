package Projektbdio.EmailContactForm;

public interface EmailSenderService {
    void sendEmail(String from, String subject, String message);
}
