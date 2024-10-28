package com.chhagan.projects.service;

import com.chhagan.projects.models.Party;
import java.util.HashMap;
import java.util.Map;
import org.jvnet.hk2.annotations.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
public final class ContextService {
  
  private static Map<String, WebSocketSession> sessionIdToSessionMap = new HashMap<>();
  private static Map<String, Party> partyIdToPartyMap = new HashMap<>();

  public static void addSession(WebSocketSession session) {
    sessionIdToSessionMap.put(session.getId(), session);
  }

  public static void removeSession(WebSocketSession session) {
    sessionIdToSessionMap.remove(session.getId());
  }

  public static WebSocketSession getSessionBySessionid(String sessionId) {
    return sessionIdToSessionMap.get(sessionId);
  }

  public static void addParty(Party party) {
    partyIdToPartyMap.put(party.getPartyId(), party);
  }

  public static void removeParty(Party party) {
    partyIdToPartyMap.remove(party.getPartyId());
  }

  public static Party getPartyByPartyId(String partyId) {
    return partyIdToPartyMap.get(partyId);
  }

  public static Party getPartyBySession(WebSocketSession session) {
    return partyIdToPartyMap.values().stream()
        .filter(party -> party.getSessions().contains(session))
        .findAny()
        .orElse(null);
  }

}
