package event_management.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class EventRequest {

    public Long eventId;
    public Long venueId;

    public String name;
    public String description;
    public String location;
    public String eventType;

    public LocalDate date;                 // FIXED
    public String time;

    public String organizerName;
    public String organizerContact;

    public Integer capacity;

    public LocalDateTime rsvpDeadline;     // FIXED
    public Boolean ticketingRequired;
    public List<String> reminders;

    public LocalDateTime startDatetime;    // FIXED
    public LocalDateTime endDatetime;      // FIXED

    public String venueAddress;
    public String hallName;
    public String eventCategory;
    public Integer maxAttendees;

    public List<String> tags;

    public List<SessionDto> sessions;
	public String imageUrl;
	public String status;

    public static class SessionDto {
        public String title;
        public String speaker;
        public LocalDateTime startDatetime;
        public LocalDateTime endDatetime;
        public String sessionType;
        public String notes;
    }
}
