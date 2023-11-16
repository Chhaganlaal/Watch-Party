package com.chhagan.projects.service;

import com.chhagan.projects.models.Party;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PartyService {

  public String createParty(String sessionId) {
    String generatedPartyId = generatePartyId();
    Party newParty = new Party(generatedPartyId);
    log.info("New party created: {}", generatedPartyId);
    ContextService.addParty(newParty);

    this.joinParty(sessionId, generatedPartyId);

    return newParty.getPartyId();
  }

  public void joinParty(String sessionId, String partyId) {
    Party party = ContextService.getPartyByPartyId(partyId);
    party.addSession(ContextService.getSessionBySessionid(sessionId));
    log.info("{} joined the party: {}", sessionId, partyId);
  }

  public void leaveParty(String sessionId, String partyId) {
    Party party = ContextService.getPartyByPartyId(partyId);
    party.removeSession(ContextService.getSessionBySessionid(sessionId));
    log.info("{} left the party: {}", sessionId, partyId);
  }

  private String generatePartyId() {
    StringBuilder partyId = new StringBuilder();
    Random random = new Random();
    while (partyId.length() < 6) {
      partyId.append(Integer.toHexString(random.nextInt(0x10)));
    }
    return partyId.toString();
  }

}
