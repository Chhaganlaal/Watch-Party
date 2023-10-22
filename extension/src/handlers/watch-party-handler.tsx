import React from "react";
import ReactDOM from "react-dom";

// interface NetflixPlayerApi {
//   videoPlayer: {
//     getAllPlayerSessionIds: () => Array<string>;
//     getVideoPlayerBySessionId: (id: string) => any;
//   }
// }

// declare global {
//   interface Window {
//     netflix: any;
//   }
// }

// function fn() {
//   console.log(window);

//   const scriptElement = document.createElement('script');
//   scriptElement.textContent = `console.log(window);`;
//   (document.head || document.documentElement).appendChild(scriptElement);
//   scriptElement.remove();

//   let e = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
//   let t: string = e.getAllPlayerSessionIds().find(((val: any) => val.includes('watch'))) || '';
//   let videoPlayer = e.getVideoPlayerBySessionId(t);

//   console.log('hello');
//   console.log(videoPlayer);
// }

class WatchPartyHandler extends React.Component {
  render = (): React.ReactNode => {
    return (
      <h1>App was injected</h1>
    )
  }
}

const container = document.createElement('div');
container.setAttribute('id', 'app-wrapper');
container.setAttribute('style', 'z-index: 10; position: relative;');
document.body.appendChild(container);

ReactDOM.render(<WatchPartyHandler/>, container);

export {};