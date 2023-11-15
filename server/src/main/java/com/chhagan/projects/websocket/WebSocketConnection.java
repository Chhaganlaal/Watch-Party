package com.chhagan.projects.websocket;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class WebSocketConnection extends AbstractWebSocketHandler {

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connected established with the websocket client : " + session.getId());
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    log.info("Connection closed with the websocket client : " + session.getId());
  }

  @Override
  public void handleMessage(WebSocketSession session, WebSocketMessage message) throws IOException {
    log.info(message.getPayload().toString());
    session.sendMessage(new TextMessage("hello"));
  }

}
