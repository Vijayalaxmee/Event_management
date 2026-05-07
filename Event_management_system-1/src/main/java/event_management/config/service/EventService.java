package event_management.config.service;

import event_management.dto.EventRequest;
import event_management.entity.Event;
import event_management.entity.Session;
import event_management.entity.Tag;
import event_management.repo.EventRepository;
import event_management.repo.EventSessionRepository;
import event_management.repo.TagRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDate;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventSessionRepository sessionRepository;
    private final TagRepository tagRepository;

    public EventService(EventRepository eventRepository,
                        EventSessionRepository sessionRepository,
                        TagRepository tagRepository) {
        this.eventRepository = eventRepository;
        this.sessionRepository = sessionRepository;
        this.tagRepository = tagRepository;
    }

    // ✅ CREATE OR UPDATE EVENT
    @Transactional
    public Event createOrUpdate(EventRequest req) {

        Event event = (req.eventId == null)
                ? new Event()
                : eventRepository.findById(req.eventId).orElse(new Event());

        event.setVenueId(req.venueId);
        event.setName(req.name);
        event.setDescription(req.description);
        event.setLocation(req.location);
        event.setEventType(req.eventType);
        event.setDate(req.date);
        event.setTime(req.time);
        event.setImageUrl(req.imageUrl);

        event.setStatus(req.status);
        event.setOrganizerName(req.organizerName);
        event.setOrganizerContact(req.organizerContact);

        event.setCapacity(req.capacity);
        event.setRsvpDeadline(req.rsvpDeadline);
        event.setTicketingRequired(req.ticketingRequired);
        event.setReminders(req.reminders == null ? null : String.join(",", req.reminders));

        event.setStartDatetime(req.startDatetime);
        event.setEndDatetime(req.endDatetime);
        event.setVenueAddress(req.venueAddress);
        event.setHallName(req.hallName);
        event.setEventCategory(req.eventCategory);
        event.setMaxAttendees(req.maxAttendees);

        Event saved = eventRepository.save(event);

        // ✅ Delete old sessions
        sessionRepository.deleteAll(
                sessionRepository.findByEvent_EventId(saved.getEventId())
        );

        // ✅ Add new sessions
        if (req.sessions != null) {
            for (EventRequest.SessionDto s : req.sessions) {
                Session ss = new Session();
                ss.setEvent(saved);
                ss.setTitle(s.title);
                ss.setSpeaker(s.speaker);
                ss.setStartDatetime(s.startDatetime);
                ss.setEndDatetime(s.endDatetime);
                ss.setSessionType(s.sessionType);
                ss.setNotes(s.notes);
                sessionRepository.save(ss);
            }
        }

        // ✅ Handle tags
        if (req.tags != null) {
            for (String t : req.tags) {
                tagRepository.findByName(t).orElseGet(() -> {
                    Tag tg = new Tag();
                    tg.setName(t);
                    return tagRepository.save(tg);
                });
            }
        }

        return saved;
    }

    // ✅ GET ALL EVENTS
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ✅ GET EVENTS BY DATE
    public List<Event> getByDate(LocalDate d) {
        return eventRepository.findByDate(d);
    }
}