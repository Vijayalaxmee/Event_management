package event_management.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Table(name = "sessions")
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String title;
    private String speaker;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private String sessionType;
    private String notes;
}
