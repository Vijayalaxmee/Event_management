package event_management.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TicketBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    private Attendee attendee;

    @ManyToOne
    private Event event;

    private String ticketType;
    private Double ticketPrice;
    private Integer quantity;

    private String promoCode;
    private Double totalAmount;

    private String paymentMethod;
    private String paymentStatus;   // PENDING / COMPLETED / FAILED

    private String qrCode;          // base64 text
    private Boolean checkedIn = false;
}
