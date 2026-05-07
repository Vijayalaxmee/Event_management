package event_management.repo;

import event_management.entity.EventAttachments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventAttachmentRepository extends JpaRepository<EventAttachments, Long> {}
