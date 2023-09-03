import React from "react";
import CreateRoomView from "./create-room-view";

interface ShareRoomViewProps {
  currentTab: chrome.tabs.Tab;
  popupStateUpdater: (currentView: React.Component) => void;
}

interface ShareRoomViewState {
}

class ShareRoomView extends React.Component<ShareRoomViewProps, ShareRoomViewState> {

  constructor(props: ShareRoomViewProps) {
    super(props);
  }

  leaveRoom = (): void => {
    const currentTab: chrome.tabs.Tab = this.props.currentTab;
    const url: URL = new URL(currentTab.url ? currentTab.url : '');
    url.searchParams.delete('roomId');
    chrome.tabs.update(currentTab.id ? currentTab.id : chrome.tabs.TAB_ID_NONE, { url: url.toString() });

    const createRoomView: CreateRoomView = new CreateRoomView({
      currentTab: currentTab,
      popupStateUpdater: (currentView: React.Component) => this.props.popupStateUpdater(currentView)
    });
    this.props.popupStateUpdater(createRoomView)
  }

  render = (): React.ReactNode => {
    return (
      <div>
        <h2>Watch Party</h2>
        <p>Share the URL below so others can join the party</p>
        <p><i>URL to WatchParty</i></p>
        <button className="button" onClick={this.leaveRoom}>Leave Party</button>
      </div>
    )
  }
}

export default ShareRoomView;