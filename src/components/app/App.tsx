import { Button } from 'antd';
import React, { Component, Fragment } from 'react';

import PomodoroTimer from 'COMPONENTS/timer';
import UserGreeting from 'COMPONENTS/userGreeting';
import { startButton } from './App.less';

interface AppState {
  shouldStart: boolean;
  userName: string;
}

class App extends Component<{}, AppState> {
  public state: AppState = {
    shouldStart: false,
    userName: 'Brent',
  };

  public render() {
    const { shouldStart, userName } = this.state;
    return shouldStart ? (
      <PomodoroTimer />
    ) : (
      <Fragment>
        <UserGreeting userName={userName} />
        <Button className={startButton} onClick={this.handleClick}>
          Start Timer
        </Button>
      </Fragment>
    );
  }

  private handleClick = () => {
    // This will give you a type error
    // this.setState({ shouldStart: 'true' });

    // This will also give you an error because the property age doesn't exist in our interface therefore its not assignable
    // this.setState({ shouldStart: true, age: 28 });
    this.setState({ shouldStart: true });
  };
}

export default App;
