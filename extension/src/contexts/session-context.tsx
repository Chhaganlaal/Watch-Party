import React from "react"
import IPartyAction from "../models/party-action-interface";

interface ISessionContext {
  sessionId: string;
  createSession: () => void;
}

interface SessionContextProps {
  children: React.ReactNode;
}

interface SessionContextState {
  sessionId: string;
  webSocket: WebSocket;
}

const SessionContext = React.createContext<ISessionContext>({sessionId: '', createSession: () => {}});

class SessionContextProvider extends React.Component<SessionContextProps, SessionContextState> {

  constructor(props: SessionContextProps) {
    super(props);
  }

  sendSessionMessage = (message: IPartyAction): void => {
    this.state.webSocket.send(JSON.stringify(message));
  }

  createSession = (): void => {
    this.setState({ sessionId: '', webSocket: new WebSocket('ws://localhost:8080/broadcast') },
      () => {
        const webSocket = this.state.webSocket;
        
        webSocket.onopen = () => {
          console.log("Socket connection established");
          this.sendSessionMessage({
            actionType: 'CREATE_SESSION',
            data: 'Socket Connection Established'
          });
        };

        webSocket.onmessage = (messageEvent: MessageEvent) => {
          const message: IPartyAction = JSON.parse(messageEvent.data);
          console.log(message);
          this.setState({
            sessionId: message.data
          });
        };

        webSocket.onerror = (event: Event) => {
          console.log('Error encountered in the socket session');
          console.error(event);
        };
    });
  }

  render = (): React.ReactNode => {
    return (
      <>
        <SessionContext.Provider value={{ sessionId: this.state?.sessionId, createSession: this.createSession }}>
          { this.props.children }
        </SessionContext.Provider>
      </>
    );
  }

}

export default SessionContextProvider