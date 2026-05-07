package event_management.config.service;

import event_management.dto.RegistrationRequest;
import event_management.entity.*;
import event_management.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final AttendeeRepository attendeeRepo;
    private final TicketBookingRepository bookingRepo;
    private final EventRepository eventRepo;

    public TicketBooking register(RegistrationRequest req) {

        Attendee attendee = new Attendee();
        attendee.setFirstName(req.getFirstName());
        attendee.setLastName(req.getLastName());
        attendee.setEmail(req.getEmail());
        attendee.setMobile(req.getMobile());
        attendee.setGender(req.getGender());
        attendee.setDob(req.getDob() != null ? java.time.LocalDate.parse(req.getDob()) : null);
        attendee.setOrganization(req.getOrganization());
        attendee.setDesignation(req.getDesignation());
        attendee.setAddress(req.getAddress());
        attendee.setCity(req.getCity());
        attendee.setCountry(req.getCountry());

        Attendee savedAttendee = attendeeRepo.save(attendee);

        TicketBooking booking = new TicketBooking();
        booking.setAttendee(savedAttendee);
        booking.setEvent(eventRepo.findById(req.getEventId()).orElse(null));
        booking.setTicketType(req.getTicketType());
        booking.setTicketPrice(req.getTicketPrice());
        booking.setQuantity(req.getQuantity());
        booking.setPromoCode(req.getPromoCode());

        double total = req.getTicketPrice() * req.getQuantity();
        booking.setTotalAmount(total);

        booking.setPaymentMethod(req.getPaymentMethod());
        booking.setPaymentStatus("COMPLETED"); // (Mock)

        // Generate QR Code (simple string)
        booking.setQrCode(UUID.randomUUID().toString());

        return bookingRepo.save(booking);
    }
}
