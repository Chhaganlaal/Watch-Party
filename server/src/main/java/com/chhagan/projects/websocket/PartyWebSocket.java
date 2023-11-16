package com.chhagan.projects.websocket;

import com.chhagan.projects.models.PartyAction;
import com.chhagan.projects.service.ContextService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
public class PartyWebSocket extends TextWebSocketHandler {

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Socket connection established with client : {}", session.getId());
    ContextService.addSession(session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    log.info("Socket connection closed with client : {}", session.getId());
    ContextService.removeSession(session);
  }

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException {
    log.info("Received message from session client {} : {}", session.getId(), new PartyAction(message));
  }

}
