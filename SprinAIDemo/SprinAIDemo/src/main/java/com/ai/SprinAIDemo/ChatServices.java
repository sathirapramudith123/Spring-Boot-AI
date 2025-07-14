package com.ai.SprinAIDemo;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ChatServices {
    private final ChatModel chatModel;

    public ChatServices(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getResponse(String prompt){
        return chatModel.call(prompt);
    }

    public String getResponseOptions(String prompt){
        ChatResponse response = chatModel.call(
                new Prompt(
                prompt,
                OpenAiChatOptions.builder()
                        .model("gpt-4o")
                        .temperature(0.4)
                        .build()
                ));
        return response.getResult().getOutput().getText();
    }
}
