package com.example.expensetracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.ignoringRequestMatchers("/api/csrf-token")) // allow CSRF endpoint without token
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/csrf-token").permitAll() // allow public access to CSRF endpoint
                .anyRequest().permitAll() // allow all other requests (for development)
            );
        return http.build();
    }
}
