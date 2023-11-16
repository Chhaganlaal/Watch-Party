package com.chhagan.projects.models;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
@NoArgsConstructor
public class PartyAction {

  String actionType;
  Object data;

  public PartyAction(TextMessage textMessage) throws JsonProcessingException {
    PartyAction partyAction;
    try {
      ObjectMapper mapper = new ObjectMapper();
      partyAction = mapper.readValue(textMessage.getPayload(), PartyAction.class);
    } catch (JsonProcessingException e) {
      log.error("Unable to parse incoming socket text message");
      throw e;
    }
    
    this.actionType = partyAction.getActionType();
    this.data = partyAction.getData();
  }

}
