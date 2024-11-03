import React from "react"
import ISocketAction from "../models/party-action.interface";
import IExtensionMessage from "../models/extension-message.interface";

export interface ISessionContext {
  sessionId: string | null;
  createSession: (callback?: () => void) => void;
  closeSession: (callback?: () => void) => void;
}

interface SessionContextProps {
  children: React.ReactNode;
}

interface SessionContextState {
  sessionId: string | null;
}

const SessionContext = React.createContext<ISessionContext>({sessionId: null, createSession: () => {}, closeSession: () => {}});

export class SessionContextProvider extends React.Component<SessionContextProps, SessionContextState> {

  constructor(props: SessionContextProps) {
    super(props);

    chrome.runtime.onMessage.addListener((message: IExtensionMessage, sender: chrome.runtime.MessageSender) => {
      if (message.messageType === 'SESSION_INFO') {
        this.setState({
          sessionId: message.data as string | null
        });
      }
    });
    
  }

  sendSessionMessage = (message: ISocketAction): void => {
    // if (this.state.webSocket != null) {
    //   this.state.webSocket.send(JSON.stringify(message));
    // }
  }

  createSession = (callback?: () => void): void => {
    const response: Promise<IExtensionMessage> = chrome.runtime.sendMessage({
      messageType: 'SESSION_INFO',
      data: 'CREATE'
    });

    response.then((message: IExtensionMessage) => {
      if (!!message) {
        console.log(message);
        this.setState({
          sessionId: message.data as string | null
        });
      }
      (typeof callback === 'function' && callback())
    });
  }

  closeSession = (callback?: () => void): void => {
    chrome.runtime.sendMessage({
      messageType: 'SESSION_INFO',
      data: 'CLOSE'
    }, () => {
      this.setState({
        sessionId: null
      });
      (typeof callback === 'function' && callback());
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

export default SessionContext;