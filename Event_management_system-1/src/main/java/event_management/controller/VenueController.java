package event_management.controller;

import event_management.entity.Venue;
import event_management.repo.VenueRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VenueController {

    private final VenueRepository repo;

   
    public VenueController(VenueRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return repo.findAll();
    }
}
