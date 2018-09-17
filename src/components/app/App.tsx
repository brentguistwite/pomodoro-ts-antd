import React, { Component, Fragment } from 'react';

import PomodoroTimer from 'COMPONENTS/timer';

class App extends Component<any, any> {
  public render() {
    return (
      <Fragment>
        <PomodoroTimer />
      </Fragment>
    );
  }
}

export default App;
