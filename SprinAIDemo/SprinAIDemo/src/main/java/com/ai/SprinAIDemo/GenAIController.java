package com.ai.SprinAIDemo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class GenAIController {

    private final ChatServices chatServices;

    public GenAIController(ChatServices chatServices) {
        this.chatServices = chatServices;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatServices.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatServices.getResponseOptions(prompt);
    }

}
