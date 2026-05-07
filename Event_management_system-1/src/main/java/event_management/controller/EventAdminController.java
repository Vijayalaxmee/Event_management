package event_management.controller;

import event_management.dto.EventRequest; 
import event_management.entity.*;
import event_management.config.service.EventService;
import event_management.repo.EventAttachmentRepository;
import event_management.repo.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EventAdminController {

  private final EventService eventService;
  private final EventAttachmentRepository attachmentRepository;
  private final EventRepository eventRepository;
  private final Path uploadRoot = Paths.get("uploads");

  public EventAdminController(EventService eventService,
                              EventAttachmentRepository attachmentRepository,
                              EventRepository eventRepository) {
    this.eventService = eventService;
    this.attachmentRepository = attachmentRepository;
    this.eventRepository = eventRepository;
    try { Files.createDirectories(uploadRoot); } catch (Exception ignored) {}
  }

  @PostMapping("/events")
  public ResponseEntity<?> createEvent(@RequestBody EventRequest req) {
    Event e = eventService.createOrUpdate(req);
    return ResponseEntity.ok(e);
  }

  @GetMapping("/events")
  public ResponseEntity<?> listEvents() {
    return ResponseEntity.ok(eventService.getAllEvents());
  }

  @GetMapping("/events/date/{date}")
  public ResponseEntity<?> eventsByDate(@PathVariable String date) {
    java.time.LocalDate d = java.time.LocalDate.parse(date);
    return ResponseEntity.ok(eventService.getByDate(d));
  }

  @GetMapping("/events/{id}")
  public ResponseEntity<?> getEvent(@PathVariable Long id) {
    return eventRepository.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/events/{id}/upload")
  public ResponseEntity<?> uploadFiles(@PathVariable Long id,
                                       @RequestParam(value="agenda", required=false) MultipartFile agenda,
                                       @RequestParam(value="banner", required=false) MultipartFile banner) {
    try {
      if (agenda != null && !agenda.isEmpty()) saveFile(id, agenda, "AGENDA");
      if (banner != null && !banner.isEmpty()) saveFile(id, banner, "BANNER");
      return ResponseEntity.ok("Uploaded");
    } catch (Exception ex) {
      ex.printStackTrace();
      return ResponseEntity.status(500).body("Upload failed");
    }
  }

  private void saveFile(Long eventId, MultipartFile file, String type) throws Exception {
    String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path dest = uploadRoot.resolve(filename);
    Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);

    EventAttachments a = new EventAttachments();
    Event ev = new Event();
    ev.setEventId(eventId); // set only id (detached)
    a.setEvent(ev);
    a.setFilename(file.getOriginalFilename());
    a.setFilePath(dest.toAbsolutePath().toString());
    a.setType(type);
    attachmentRepository.save(a);
  }
}
