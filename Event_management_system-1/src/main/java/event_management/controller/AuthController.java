package event_management.controller;


import event_management.config.service.AuthService;
import event_management.config.service.OtpService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final OtpService otpService;
    private final AuthService authService;

    public AuthController(OtpService otpService, AuthService authService) {
        this.otpService = otpService;
        this.authService = authService;
    }

    // ===================== SEND OTP FOR REGISTER =====================
    @PostMapping("/send-otp-register")
    public String sendOtpRegister(@RequestBody Map<String, String> body) {
        String phone = body.get("phoneNumber");

        if (authService.isUserExists(phone))
            return "User already registered";

        otpService.generateOtp(phone);
        return "OTP sent successfully!";
    }

    // ===================== SEND OTP FOR LOGIN ======================
    @PostMapping("/send-otp-login")
    public String sendOtpLogin(@RequestBody Map<String, String> body) {
        String phone = body.get("phoneNumber");

        if (!authService.isUserExists(phone))
            return "User not found";

        otpService.generateOtp(phone);
        return "OTP sent successfully!";
    }

    // ===================== REGISTER ======================
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body, HttpSession session) {

        String phone = body.get("phoneNumber");
        String name = body.get("name");
        String otp = body.get("otp");

        if (authService.isUserExists(phone))
            return "User already registered";

        if (!otpService.verifyOtp(phone, otp))
            return "Invalid or expired OTP";

        authService.registerUser(name, phone);

        saveSession(session, phone);
        return "User registered successfully";
    }

    // ===================== LOGIN ======================
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body, HttpSession session) {

        String phone = body.get("phoneNumber");
        String otp = body.get("otp");

        if (!authService.isUserExists(phone))
            return "User not found";

        if (!otpService.verifyOtp(phone, otp))
            return "Invalid or expired OTP";

        authService.loginUser(phone);

        saveSession(session, phone);
        return "User logged in successfully";
    }

    // ===================== SAVE SESSION ======================
    private void saveSession(HttpSession session, String phone) {
        session.setAttribute("user", phone);
        session.setAttribute("lastActivity", System.currentTimeMillis());
        session.setMaxInactiveInterval(60); // session timeout 1 min
    }

    // ===================== SESSION STATUS ======================
    @GetMapping("/session-status")
    public String sessionStatus(HttpSession session) {

        Object user = session.getAttribute("user");
        if (user == null)
            return "Session expired. Please login again.";

        long last = (long) session.getAttribute("lastActivity");
        long now = System.currentTimeMillis();

        if ((now - last) > (session.getMaxInactiveInterval() * 1000L)) {
            session.invalidate();
            return "Session expired due to inactivity.";
        }

        return "Session is active.";
    }

    // ===================== EXTEND SESSION ======================
    @PostMapping("/extend-session")
    public String extendSession(HttpSession session) {

        if (session.getAttribute("user") == null)
            return "Session expired";

        session.setAttribute("lastActivity", System.currentTimeMillis());
        return "Session extended";
    }

    // ===================== LOGOUT BY PHONE ======================
    @PostMapping("/logout-by-phone")
    public String logoutByPhone(@RequestBody Map<String, String> body, HttpSession session) {

        String phone = body.get("phoneNumber");

        if (!authService.isUserExists(phone)) {
            return "User not found";
        }

        session.invalidate();
        return "Logged out successfully";
    }
}
