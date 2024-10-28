import React from "react";
import CreateRoomView from "../views/create-room-view";
import ShareRoomView from "../views/share-room-view";
import DefaultView from "../views/default-view";
import { ISessionContext, SessionContextConsumer } from "../contexts/session-context";

interface PopupProps {
}

interface PopupState {
  currentView: React.Component;
}

class Popup extends React.Component<PopupProps, PopupState> {
  
  constructor(props: PopupProps) {
    super(props);

    this.state = {
      currentView: new DefaultView({})
    };
  }

  setCurrentView = (sessionContext: ISessionContext): void => {
    chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
      const currentTab: chrome.tabs.Tab = tabs[0];
      const url: URL = new URL(currentTab.url ? currentTab.url : '');

      if (url.hostname === 'www.netflix.com') {
        if (url.pathname.includes('watch') && sessionContext.sessionId) {
          const shareRoomView: ShareRoomView = new ShareRoomView({
            currentTab: currentTab,
            popupViewUpdater: (sessionContext: ISessionContext) => this.setCurrentView(sessionContext)
          });
          this.setState({ currentView: shareRoomView });
        } else {
          const createRoomView: CreateRoomView = new CreateRoomView({
            currentTab: currentTab,
            popupViewUpdater: (sessionContext: ISessionContext) => this.setCurrentView(sessionContext)
          });
          this.setState({ currentView: createRoomView });
        }
      }
    });
  }

  render = (): React.ReactNode => {
    return (
      <>
        <SessionContextConsumer>
          { (sessionContext: ISessionContext) => (
            <>{ this.setCurrentView(sessionContext) }</>
          ) }
        </SessionContextConsumer>
        { this.state.currentView.render() }
      </>
    );
  }
}

export default Popup;