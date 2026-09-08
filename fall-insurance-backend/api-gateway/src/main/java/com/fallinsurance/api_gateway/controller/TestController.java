package com.fallinsurance.api_gateway.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/public/health")
    public Mono<Map<String, String>> health() {
        Map<String, String> res = new HashMap<>();
        res.put("status", "ok");
        return Mono.just(res);
    }

    @GetMapping("/me")
    public Mono<Map<String, String>> me(@AuthenticationPrincipal Jwt jwt) {
        String givenName = jwt.getClaimAsString("given_name");
        Map<String, String> res = new HashMap<>();
        res.put("message", "Welcome " + givenName + "!");
        return Mono.just(res);
    }
}