package event_management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "event_attachments")
public class EventAttachments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attachmentId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String filename;
    private String filePath;
    private String type; 
}

