package morningrolecall.heulgit.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.notification.domain.Notification;
import morningrolecall.heulgit.user.domain.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	List<Notification> findByReceiverOrderByCreatedDateDesc(User receiver);

	long countByReceiverAndHasReadFalse(User receiver);

	@Modifying
	@Query("UPDATE Notification n SET n.hasRead = true WHERE n.notificationId = :notificationId")
	void updateHasReadById(Long notificationId);



}
