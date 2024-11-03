import IExtensionMessage from "./models/extension-message.interface";
import ISocketAction from "./models/party-action.interface";

let webSocket: WebSocket;
let reconnectAttempts: number = 0;
const maxReconnectAttempts: number = 3;
const baseReconnectDelay: number = 1000;
const scriptInjectedTabs: Set<number> = new Set<number>();

function createSession(updatePopuSession: (payload: IExtensionMessage) => void): void {
  webSocket = new WebSocket('ws://localhost:8080/broadcast');
  
  webSocket.onopen = () => {
    console.log("Socket connection established");
    reconnectAttempts = 0;
  };

  webSocket.onmessage = (messageEvent: MessageEvent) => {
    console.log(messageEvent.data);
    const message: ISocketAction = JSON.parse(messageEvent.data);
    if (message.actionType === 'CREATE_SESSION') {
      updatePopuSession({
        messageType: 'SESSION_INFO',
        data: message.data
      });
    }
  };

  webSocket.onclose = (closeEvent: CloseEvent) => {
    console.log('WebSocket connection closed:', closeEvent);
  }

  webSocket.onerror = (errorEvent: Event) => {
    console.log('Error encountered in the socket session:', errorEvent);
    attemptReconnection();
  };
}

function closeSession (): void {
  if (webSocket != null) {
    webSocket.close();
  }
  chrome.runtime.sendMessage({
    messageType: 'SESSION_INFO',
    data: null
  });
}

function sendSessionMessage (message: ISocketAction): void {
  if (webSocket != null) {
    webSocket.send(JSON.stringify(message));
  }
}

function attemptReconnection(): void {
  if (reconnectAttempts < maxReconnectAttempts) {
    const reconnectDelay = baseReconnectDelay * Math.pow(2, reconnectAttempts);
    console.log(`Attempting to reconnect in ${reconnectDelay / 1000} seconds...`);
    setTimeout(() => {
      console.log(`Reconnecting attempt ${reconnectAttempts}...`);
      createSession(chrome.runtime.sendMessage);
    }, reconnectDelay);
  } else {
    console.error('Max reconnection attempts reached. Please check your connection or try again later.');
    closeSession();
  }
}

chrome.runtime.onMessage.addListener((message: IExtensionMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: IExtensionMessage) => void) => {
  console.log(message);
  console.log(sender);
  if (message.messageType === 'SESSION_INFO') {
    if (message.data as string === 'CREATE') {
      createSession(sendResponse);
    } else if (message.data as string === 'CLOSE') {
      closeSession();
    } else {
      sendSessionMessage(message.data as ISocketAction);
    }
    return true;
  } else if (message.messageType === 'INJECT_SCRIPT') {
    const tabId: number = message.data ? message.data as number : chrome.tabs.TAB_ID_NONE;
    if (!scriptInjectedTabs.has(tabId)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["js/content_script.js"]
      });
      scriptInjectedTabs.add(tabId);
    }
  }
});

export {};