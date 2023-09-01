import React from "react";

interface PopupProps {
}

interface PopupState {
}

class Popup extends React.Component<PopupProps, PopupState> {
  
  constructor(props: PopupProps) {
    super(props);

    chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
      var currentTab = tabs[0];
      const url = new URL(currentTab.url ? currentTab.url : '');
      if (url.hostname === 'www.netflix.com') {
        if (url.pathname === '/browse') {
          this.showMessage("Choose something to watch first, then open this up again to make a room!");
        } else if (url.pathname.includes('watch')) {
          if (url.searchParams.has('roomId')) {
            // TODO: Put shareroom location
            window.location.href = '#';
          } else {
            // TODO: Put createroom location
            window.location.href = '#'
          }
        }
      }
    });
  }

  showMessage(message: string) {
    const userMessageElement = document.getElementById('user-message');
    if (userMessageElement) {
      userMessageElement.innerHTML = message;
    } else {
      console.log(message);
    }
  }

  render() {
    return (
      <div>
        <h2>Watch Party</h2>
        <p id="user-message">Watch Netflix with friends!</p>
      </div>
    );
  }
}

export default Popup;