chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender) => {
  console.log(request);
  console.log(sender);
  chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
    if (tabId === request.id && changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: request.id ? request.id : chrome.tabs.TAB_ID_NONE },
        files: ["js/content_script.js"]
      });
    }
  });
});

export {};