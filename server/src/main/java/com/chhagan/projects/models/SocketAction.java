package com.chhagan.projects.models;

import com.chhagan.projects.constants.ActionType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
@NoArgsConstructor
public class SocketAction {

  ActionType actionType;
  Object data;

  public static SocketAction fromJson(String json) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.readValue(json, SocketAction.class);
  }

  public static String toJson(SocketAction socketAction) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.writeValueAsString(socketAction);
  }

}
