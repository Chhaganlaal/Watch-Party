package com.chhagan.projects.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.chhagan.projects.websocket.WebSocketConnection;

import jakarta.inject.Inject;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  private final WebSocketConnection webSocketConnection;

  @Inject
  public WebSocketConfig(WebSocketConnection webSocketConnection) {
    this.webSocketConnection = webSocketConnection;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(webSocketConnection, "/broadcast").setAllowedOrigins("*");
  }
  
}
