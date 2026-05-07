package event_management.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendeeId;

    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String gender;
    private LocalDate dob;
    private String organization;
    private String designation;
    private String address;
    private String city;
    private String country;
}
