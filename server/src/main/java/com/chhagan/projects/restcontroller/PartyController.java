package com.chhagan.projects.restcontroller;

import com.chhagan.projects.service.PartyService;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@Path("/party")
public class PartyController {

  private PartyService partyService;
  
  @Inject
  public PartyController(PartyService partyService) {
    this.partyService = partyService;
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response test() {
    Response.ResponseBuilder responseBuilder = Response.noContent();
    log.info("Controller working");
    return responseBuilder.entity("Hello").status(Response.Status.OK).build();
  }

  @POST
  @Path("/create/{sessionId}")
  public Response createParty(@PathParam("sessionId") String sessionId) {
    log.info("New party creation requested by session {}", sessionId);
    Response.ResponseBuilder responseBuilder = Response.noContent();

    try {
      responseBuilder.entity(partyService.createParty(sessionId)).status(Response.Status.CREATED);
    } catch (Exception e) {
      log.error("{} - Exception occurred while creating party", e.getClass(), e);
      responseBuilder.status(Response.Status.INTERNAL_SERVER_ERROR);
    }

    return responseBuilder.build();
  }

  @PUT
  @Path("/join/{sessionId}/{partyId}")
  public Response joinParty(@PathParam("sessionId") String sessionId,
                            @PathParam("partyId") String partyId) {
    log.info("Session client {} wants to join party {}", sessionId, partyId);
    Response.ResponseBuilder responseBuilder = Response.noContent();

    try {
      partyService.joinParty(sessionId, partyId);
      responseBuilder.status(Response.Status.ACCEPTED);
    } catch (Exception e) {
      log.error("{} - Exception occurred while joining party", e.getClass(), e);
      responseBuilder.status(Response.Status.INTERNAL_SERVER_ERROR);
    }

    return responseBuilder.build();
  }

  @DELETE
  @Path("/leave/{sessionId}/{partyId}")
  public Response leaveParty(@PathParam("sessionId") String sessionId,
                             @PathParam("partyId") String partyId) {
    log.info("Session client {} wants to leave party {}", sessionId, partyId);
    Response.ResponseBuilder responseBuilder = Response.noContent();

    try {
      partyService.leaveParty(sessionId, partyId);
      responseBuilder.status(Response.Status.ACCEPTED);
    } catch (Exception e) {
      log.error("{} - Exception occurred while leaving party", e.getClass(), e);
      responseBuilder.status(Response.Status.INTERNAL_SERVER_ERROR);
    }

    return responseBuilder.build();
  }

}
