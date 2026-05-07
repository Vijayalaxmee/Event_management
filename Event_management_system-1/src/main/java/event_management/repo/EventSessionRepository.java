package event_management.repo;

import event_management.entity.Session;       // ✅ MUST ADD THIS
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventSessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByEvent_EventId(Long eventId);
}
