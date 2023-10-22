const scriptElement = document.createElement('script');
scriptElement.src = chrome.runtime.getURL('js/watch_party_handler.js');
scriptElement.onload = function() {
  scriptElement.remove();
};
(document.head || document.documentElement).appendChild(scriptElement);

export {};