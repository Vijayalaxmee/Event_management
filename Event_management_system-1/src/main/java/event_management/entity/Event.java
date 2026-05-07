package event_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private Long orgId;
    private Long venueId;

    private String name;
    private String description;
    private String location;
    private String eventType;

    private LocalDate date;
    private String time;

    // 👇 IMPORTANT — These two MUST EXIST
    private String imageUrl;
    private String status;

    private String organizerName;
    private String organizerContact;

    private Integer capacity;
    private LocalDateTime rsvpDeadline;
    private Boolean ticketingRequired;
    private String reminders;

    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;

    private String venueAddress;
    private String hallName;
    private String eventCategory;
    private Integer maxAttendees;
}
