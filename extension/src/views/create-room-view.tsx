import React from "react";
import ShareRoomView from "./share-room-view";

interface CreateRoomViewProps {
  currentTab: chrome.tabs.Tab;
  popupStateUpdater: (currentView: React.Component) => void;
}

interface CreateRoomViewState {
  buttonText: string;
  canCreateParty: boolean;
}

class CreateRoomView extends React.Component<CreateRoomViewProps, CreateRoomViewState> {

  // buttonText: string;
  // canCreateParty: boolean;

  constructor(props: CreateRoomViewProps) {
    super(props);

    const currentTabUrl = new URL(this.props.currentTab.url ? this.props.currentTab.url : '');
    if (currentTabUrl.pathname.includes('/browse') || currentTabUrl.pathname.includes('/title')) {
      this.state = {
        buttonText: 'Play a video first',
        canCreateParty: false
      }
    } else if (currentTabUrl.pathname.includes('/watch')) {
      this.state = {
        buttonText: 'Start the party',
        canCreateParty: true
      }
    } else {
      this.state = {
        buttonText: '',
        canCreateParty: false
      }
    }
  }

  createRoom = (): void => {
    const currentTab: chrome.tabs.Tab = this.props.currentTab;
    const url: URL = new URL(currentTab.url ? currentTab.url : '');
    url.searchParams.append('roomId', '123');
    chrome.tabs.update(currentTab.id ? currentTab.id : chrome.tabs.TAB_ID_NONE, { url: url.toString() })
      .then((updatedTab: chrome.tabs.Tab) => {
        const shareRoomView: ShareRoomView = new ShareRoomView({
          currentTab: updatedTab,
          popupStateUpdater: (currentView: React.Component) => this.props.popupStateUpdater(currentView)
        });
        this.props.popupStateUpdater(shareRoomView);

        chrome.runtime.sendMessage(currentTab);
      }, (error) => {
        console.error(error);
      });
  }

  render = (): React.ReactNode => {
    return (
      <div>
        <h2>Watch Party</h2>
        <p>Create a party</p>
        <button className="button" disabled={!this.state.canCreateParty} onClick={this.createRoom}>{this.state.buttonText}</button>
      </div>
    )
  }
}

export default CreateRoomView;