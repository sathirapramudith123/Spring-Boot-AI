package com.ai.SprinAIDemo;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class GenAIController {

    private final ChatServices chatServices;
    private final ImageServices imageServices;

    public GenAIController(ChatServices chatServices, ImageServices imageServices) {
        this.chatServices = chatServices;
        this.imageServices = imageServices;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatServices.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatServices.getResponseOptions(prompt);
    }

    @GetMapping("generate-image")
    public void generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {
        ImageResponse imageResponse = imageServices.generateImage(prompt);
        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

}
