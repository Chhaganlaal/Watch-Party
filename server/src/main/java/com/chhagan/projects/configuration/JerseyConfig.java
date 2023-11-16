package com.chhagan.projects.configuration;

import com.chhagan.projects.restcontroller.PartyController;
import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
@ApplicationPath("/app")
public class JerseyConfig extends ResourceConfig {
  
  public JerseyConfig() {
    register(PartyController.class);
  }

}
