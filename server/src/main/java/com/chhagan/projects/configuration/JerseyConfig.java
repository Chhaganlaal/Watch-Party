package com.chhagan.projects.configuration;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.chhagan.projects.controller.WatchPartyController;

import jakarta.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/")
public class JerseyConfig extends ResourceConfig {
  
  public JerseyConfig() {
    register(WatchPartyController.class);
  }

}
