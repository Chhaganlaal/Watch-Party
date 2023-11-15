package com.chhagan.projects.restcontroller;

import org.springframework.stereotype.Controller;

import com.chhagan.projects.websocket.WebSocketConnection;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@Path("/party")
public class PartyController {
  
  @Inject
  public PartyController(WebSocketConnection webSocketConnection) {
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response test() {
    Response.ResponseBuilder responseBuilder = Response.noContent();
    log.info("Controller working");
    return responseBuilder.entity("Hello").status(Response.Status.OK).build();
  }

  @GET
  @Path("/create")
  @Produces(MediaType.APPLICATION_JSON)
  public Response createParty() {
    Response.ResponseBuilder responseBuilder = Response.noContent();

    

    return responseBuilder.build();
  }

}
