import React from "react";

interface DefaultViewProps {
}

interface DefaultViewState {
}

class DefaultView extends React.Component<DefaultViewProps, DefaultViewState> {
  render = (): React.ReactNode => {
    return (
      <div>
        <h2>Watch Party</h2>
        <p>Watch Netflix with friends</p>
      </div>
    )
  }
}

export default DefaultView;