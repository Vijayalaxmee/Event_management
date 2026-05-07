package event_management.controller;

import event_management.config.service.RegistrationService;
import event_management.dto.RegistrationRequest;
import event_management.entity.TicketBooking;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public TicketBooking register(@RequestBody RegistrationRequest req) {
        return registrationService.register(req);
    }
}
