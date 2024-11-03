import React from "react";
import CreateRoomView from "../views/create-room-view";
import ShareRoomView from "../views/share-room-view";
import DefaultView from "../views/default-view";
import SessionContext, { ISessionContext } from "../contexts/session-context";
import IExtensionMessage from "../models/extension-message.interface";

interface PopupProps {
}

interface PopupState {
  currentView: React.Component;
}

class Popup extends React.Component<PopupProps, PopupState> {

  static contextType: React.Context<ISessionContext> = SessionContext;
  declare context: React.ContextType<typeof SessionContext>;
  prevSessionId: string | null = null;
  
  constructor(props: PopupProps) {
    super(props);

    this.state = {
      currentView: new DefaultView({})
    };
  }

  componentDidUpdate(_prevProps: Readonly<PopupProps>, _prevState: Readonly<PopupState>): void {
    if (this.context.sessionId !== this.prevSessionId) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        this.setCurrentView(tabs[0])
      });
      this.prevSessionId = this.context.sessionId;
    }
  }

  componentDidMount(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab: chrome.tabs.Tab = tabs[0];
      chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (tabId === currentTab.id && changeInfo.status === 'complete') {
          this.setCurrentView(tab);
        }
      });
      chrome.runtime.sendMessage({
        messageType: 'INJECT_SCRIPT',
        data: currentTab.id
      } as IExtensionMessage)
      this.setCurrentView(currentTab);
    });
  }

  setCurrentView = (currentTab: chrome.tabs.Tab): void => {
    const url: URL = new URL(currentTab.url ? currentTab.url : '');
    if (url.hostname === 'www.netflix.com') {
      if (url.pathname.includes('watch') && this.context.sessionId) {
        const shareRoomView: ShareRoomView = new ShareRoomView({
          currentTab: currentTab,
          popupViewUpdater: this.setCurrentView
        });
        this.setState({ currentView: shareRoomView });
      } else {
        const createRoomView: CreateRoomView = new CreateRoomView({
          currentTab: currentTab,
          popupViewUpdater: this.setCurrentView
        });
        this.setState({ currentView: createRoomView });
      }
    }
  }

  render = (): React.ReactNode => {
    return (
      <>
        { this.state.currentView.render() }
      </>
    );
  }
}

export default Popup;