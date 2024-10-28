import React from "react"
import IPartyAction from "../models/party-action-interface";

export interface ISessionContext {
  sessionId: string;
  createSession: (callback?: () => void) => void;
  closeSession: (callback?: () => void) => void;
}

interface SessionContextProps {
  children: React.ReactNode;
}

interface SessionContextState {
  sessionId: string;
  webSocket: WebSocket | null;
}

const SessionContext = React.createContext<ISessionContext>({sessionId: '', createSession: () => {}, closeSession: () => {}});

export class SessionContextProvider extends React.Component<SessionContextProps, SessionContextState> {

  constructor(props: SessionContextProps) {
    super(props);
  }

  sendSessionMessage = (message: IPartyAction): void => {
    if (this.state.webSocket != null) {
      this.state.webSocket.send(JSON.stringify(message));
    }
  }

  createSession = (callback?: () => void): void => {
    this.setState({ webSocket: new WebSocket('ws://localhost:8080/broadcast') },
      () => {
        if (this.state.webSocket != null) {
          const webSocket: WebSocket = this.state.webSocket;
          
          webSocket.onopen = () => {
            console.log("Socket connection established");
          };

          webSocket.onmessage = (messageEvent: MessageEvent) => {
            console.log(messageEvent.data);
            const message: IPartyAction = JSON.parse(messageEvent.data);
            if (message.actionType === 'CREATE_SESSION') {
              this.setState({
                sessionId: message.data
              }, () => {
                (typeof callback === 'function' && callback())
              });
            }
          };

          webSocket.onerror = (event: Event) => {
            console.log('Error encountered in the socket session');
            console.error(event);
          };
        }
    });
  }

  closeSession = (callback?: () => void): void => {
    if (this.state.webSocket != null) {
      this.state.webSocket.close();
    }
    this.setState({
      sessionId: '',
      webSocket: null
    }, () => {
      (typeof callback === 'function' && callback())
    });
  }

  render = (): React.ReactNode => {
    return (
      <SessionContext.Provider value={{
        sessionId: this.state?.sessionId,
        createSession: this.createSession,
        closeSession: this.closeSession
      }}>
        { this.props.children }
      </SessionContext.Provider>
    );
  }

}

export const SessionContextConsumer = SessionContext.Consumer;