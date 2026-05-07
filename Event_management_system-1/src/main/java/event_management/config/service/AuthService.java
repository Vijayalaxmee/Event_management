package event_management.config.service;

import event_management.entity.User;
import event_management.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserExists(String phone) {
        if (phone == null) return false;
        return userRepository.existsByPhone(phone);
    }

    public String registerUser(String name, String phone) {
        User u = new User();
        u.setName(name);
        u.setPhone(phone);
        userRepository.save(u);
        return "User registered successfully";
    }

    public String loginUser(String phone) {
        if (!isUserExists(phone)) return "User not found";
        return "User logged in successfully";
    }

    public String logoutUser(String phone) {
        // optional: additional logout bookkeeping
        return "User logged out";
    }
}
