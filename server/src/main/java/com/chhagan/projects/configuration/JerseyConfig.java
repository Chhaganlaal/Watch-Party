package com.chhagan.projects.configuration;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

import com.chhagan.projects.restcontroller.PartyController;

import jakarta.ws.rs.ApplicationPath;

@Configuration
@ApplicationPath("/app")
public class JerseyConfig extends ResourceConfig {
  
  public JerseyConfig() {
    register(PartyController.class);
  }

}
