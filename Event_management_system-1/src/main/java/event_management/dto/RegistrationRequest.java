package event_management.dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    // Attendee fields
    public String firstName;
    public String lastName;
    public String email;
    public String mobile;
    public String gender;
    public String dob;
    public String organization;
    public String designation;
    public String address;
    public String city;
    public String country;

    // Booking fields
    public Long eventId;
    public String ticketType;
    public Double ticketPrice;
    public Integer quantity;
    public String promoCode;

    public String paymentMethod;
}
