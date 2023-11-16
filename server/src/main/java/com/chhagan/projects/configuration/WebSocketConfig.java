package com.chhagan.projects.configuration;

import com.chhagan.projects.websocket.PartyWebSocket;
import jakarta.inject.Inject;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  private final PartyWebSocket partyWebSocket;

  @Inject
  public WebSocketConfig(PartyWebSocket webSocketConnection) {
    this.partyWebSocket = webSocketConnection;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(partyWebSocket, "/broadcast").setAllowedOrigins("*");
  }
  
}
