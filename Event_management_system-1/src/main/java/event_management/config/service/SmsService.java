package event_management.config.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class SmsService {

    private final String API_KEY = "0e33936b-c9f5-11f0-a6b2-0200cd936042";

    public boolean sendSms(String phone, String otp) {
        try {
            String message = "Your OTP is: " + otp;

            String url = "https://2factor.in/API/V1/" + API_KEY +
                    "/SMS/" + phone + "/" + otp +
                    "/" + URLEncoder.encode(message, StandardCharsets.UTF_8);

            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForObject(url, String.class);

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
