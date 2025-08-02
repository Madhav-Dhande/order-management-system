package com.order.order_service.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", "dwqcjtsax");
        config.put("api_key", "939785823238837");
        config.put("api_secret", "t6cwDqynuxgepuPR9fhdihMGkXM");

        return new Cloudinary(config);
    }
}
