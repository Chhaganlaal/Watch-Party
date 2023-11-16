package com.chhagan.projects.models;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

@Data
public class Party {
  
  private String partyId;
  private Set<WebSocketSession> sessions;

  public Party(String partyId) {
    this.partyId = partyId;
    this.sessions = new HashSet<>();
  }

  public void addSession(WebSocketSession session) {
    this.sessions.add(session);
  }

  public void removeSession(WebSocketSession session) {
    this.sessions.remove(session);
  }

}
