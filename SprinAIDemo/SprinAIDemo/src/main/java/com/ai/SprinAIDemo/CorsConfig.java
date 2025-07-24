package com.ai.SprinAIDemo;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CorsConfig {

    public WebMvcConfigurer CorsConfigurer(){
        return  new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000/")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
