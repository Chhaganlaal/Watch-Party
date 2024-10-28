import React from "react";
import ShareRoomView from "./share-room-view";
import { ISessionContext, SessionContextConsumer } from "../contexts/session-context";

interface CreateRoomViewProps {
  currentTab: chrome.tabs.Tab;
  popupViewUpdater: (sessionContext: ISessionContext) => void;
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

  createRoom = (sessionContext: ISessionContext): void => {
    sessionContext.createSession(() => {
      this.props.popupViewUpdater(sessionContext);

      chrome.runtime.sendMessage(this.props.currentTab);
    });
  }

  render = (): React.ReactNode => {
    return (
      <>
        <h2>Watch Party</h2>
        <p>Create a party</p>
        <SessionContextConsumer>
          { (sessionContext: ISessionContext) => (
            <button className="button"
                disabled={ !this.state.canCreateParty }
                onClick={ () => this.createRoom(sessionContext) }>
              { this.state.buttonText }
            </button>
          ) }
        </SessionContextConsumer>
      </>
    )
  }
}

export default CreateRoomView;