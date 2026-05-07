package event_management.config.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final String API_KEY = "0e33936b-c9f5-11f0-a6b2-0200cd936042";

    private final RestTemplate restTemplate = new RestTemplate();

    // phone → sessionId
    private final Map<String, String> sessionStore = new ConcurrentHashMap<>();

    // ===================== SEND OTP =====================
    @SuppressWarnings("unchecked")
    public void generateOtp(String phone) {

        String url =
            "https://2factor.in/API/V1/" + API_KEY + "/SMS/" + phone + "/AUTOGEN";

        Map<String, Object> response =
            restTemplate.getForObject(url, Map.class);

        System.out.println("OTP API RESPONSE: " + response);

        if (response != null && "Success".equalsIgnoreCase((String) response.get("Status"))) {

            String sessionId = (String) response.get("Details");
            sessionStore.put(phone, sessionId);

            System.out.println("OTP sent successfully. Session ID=" + sessionId);

        } else {
            throw new RuntimeException("Failed to send OTP: " + response);
        }
    }

    // ===================== VERIFY OTP =====================
    @SuppressWarnings("unchecked")
    public boolean verifyOtp(String phone, String otp) {

        String sessionId = sessionStore.get(phone);
        if (sessionId == null) return false;

        String verifyUrl =
                "https://2factor.in/API/V1/" + API_KEY + "/SMS/VERIFY/" + sessionId + "/" + otp;

        Map<String, Object> result =
                restTemplate.getForObject(verifyUrl, Map.class);

        if (result != null && "Success".equals(result.get("Status"))) {
            sessionStore.remove(phone);
            return true;
        }

        return false;
    }
}
