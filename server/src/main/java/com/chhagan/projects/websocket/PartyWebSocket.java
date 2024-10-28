package com.chhagan.projects.websocket;

import com.chhagan.projects.constants.ActionType;
import com.chhagan.projects.models.SocketAction;
import com.chhagan.projects.service.ContextService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
public class PartyWebSocket extends TextWebSocketHandler {

  @Override
  public void afterConnectionEstablished(@NonNull WebSocketSession session) throws JsonProcessingException {
    log.info("Socket connection established with client {}", session.getId());
    SocketAction confirmConnection = new SocketAction();
    confirmConnection.setActionType(ActionType.CREATE_SESSION);
    confirmConnection.setData(session.getId());
    WebSocketMessage<String> socketMessage = new TextMessage(SocketAction.toJson(confirmConnection));
    try {
      session.sendMessage(socketMessage);
    } catch (IOException e) {
      log.error("Error occurred while confirming session creation - {}", e.getMessage());
    }
    ContextService.addSession(session);
  }

  @Override
  public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
    log.info("Socket connection closed with client {}", session.getId());
    ContextService.removeSession(session);
  }

  @Override
  public void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws JsonProcessingException {
    SocketAction socketAction = SocketAction.fromJson(message.getPayload());
    log.info("Received message from session client {} : {}", session.getId(), socketAction);
  }

}
