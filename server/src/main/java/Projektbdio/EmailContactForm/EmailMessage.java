package Projektbdio.EmailContactForm;

public class EmailMessage {
    String from;
    String message;
    String subject;
    public EmailMessage(){
    }

    public EmailMessage(String from, String subject, String message){
        this.message = message;
        this.from = from;
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
