package com.onDiscover;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OnDiscoverBackTrainingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnDiscoverBackTrainingApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/person/").allowedOrigins("http://localhost:4200");
				registry.addMapping("/person/{id}").allowedOrigins("http://localhost:4200");
				registry.addMapping("/person/save").allowedOrigins("http://localhost:4200");
			}
		};
	}

	@Bean
	public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
		return jackson2ObjectMapperBuilderCustomizer -> jackson2ObjectMapperBuilderCustomizer
				.timeZone(TimeZone.getDefault());
	}
}
