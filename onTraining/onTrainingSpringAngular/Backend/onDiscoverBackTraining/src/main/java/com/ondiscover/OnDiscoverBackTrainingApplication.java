package com.ondiscover;

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

	/**
	 * It defines de access cross origin
	 * @return
	 */
	@Bean
	public WebMvcConfigurer corsConfigure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				String angular_dev = "http://localhost:4200";
				registry.addMapping("/**").allowedOrigins(angular_dev).allowedMethods("GET", "POST", "DELETE");
			}
		};
	}

	/**
	 * It defines the timezone as default
	 * @return
	 */
	@Bean
	public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
		return jackson2ObjectMapperBuilderCustomizer -> jackson2ObjectMapperBuilderCustomizer
				.timeZone(TimeZone.getDefault());
	}
}
