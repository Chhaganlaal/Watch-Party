import React from "react";
import { ISessionContext, SessionContextConsumer } from "../contexts/session-context";

interface ShareRoomViewProps {
  currentTab: chrome.tabs.Tab;
  popupViewUpdater: (currentTab: chrome.tabs.Tab) => void;
}

interface ShareRoomViewState {
}

class ShareRoomView extends React.Component<ShareRoomViewProps, ShareRoomViewState> {

  constructor(props: ShareRoomViewProps) {
    super(props);
  }

  leaveRoom = (sessionContext: ISessionContext): void => {
    sessionContext.closeSession();
  }

  render = (): React.ReactNode => {
    return (
      <>
        <h2>Watch Party</h2>
        <p>Share the URL below so others can join the party</p>
        <p><i>URL to WatchParty</i></p>
        <SessionContextConsumer>
          { (sessionContext: ISessionContext) => (
            <button className="button"
								onClick={ () => this.leaveRoom(sessionContext) }>
              Leave Party {sessionContext.sessionId}
            </button>
          ) }
        </SessionContextConsumer>
      </>
    )
  }
}

export default ShareRoomView;