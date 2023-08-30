package com.chhagan.projects.controller;

import org.springframework.stereotype.Component;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@Path("watch-party/")
public class WatchPartyController {
  
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response test() {
    Response.ResponseBuilder responseBuilder = Response.noContent();
    log.info("Controller working");
    return responseBuilder.entity("Hello").status(Response.Status.OK).build();
  }

}
