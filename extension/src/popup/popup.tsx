import React, { useEffect } from "react";
import DefaultView from "../views/default-view";
import CreateRoomView from "../views/create-room-view";
import ShareRoomView from "../views/share-room-view";

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

    this.setCurrentView();
  }

  setCurrentView = (): void => {
    chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
      const currentTab: chrome.tabs.Tab = tabs[0];
      const url: URL = new URL(currentTab.url ? currentTab.url : '');

      if (url.hostname === 'www.netflix.com') {
        if (url.pathname.includes('watch') && url.searchParams.has('roomId')) {
          const shareRoomView: ShareRoomView = new ShareRoomView({
            currentTab: currentTab,
            popupStateUpdater: (currentView: React.Component) => this.setState({currentView})
          });
          this.setState({currentView: shareRoomView});
        } else {
          const createRoomView: CreateRoomView = new CreateRoomView({
            currentTab: currentTab,
            popupStateUpdater: (currentView: React.Component) => this.setState({currentView})
          });
          this.setState({currentView: createRoomView});
        }
      }
    });
  }

  render = (): React.ReactNode => {
    return (
      this.state.currentView.render()
    );
  }
}

export default Popup;