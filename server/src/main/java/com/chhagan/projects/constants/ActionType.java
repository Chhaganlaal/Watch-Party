package com.chhagan.projects.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ActionType {

  CREATE_SESSION("Create Session"),
  CLOSE_SESSION("Close Session");
  
  private final String actionValue;

}
