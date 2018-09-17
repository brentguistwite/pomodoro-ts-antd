import { Button } from 'antd';
import React, { PureComponent } from 'react';

import { timerButton, timerDisplay, timerText } from './Timer.less';

class PomodoroTimer extends PureComponent {
  public state = {
    interval: 0,
    isBreakTime: false,
    isPaused: true,
    pomodoroCount: 0,
    timeLeft: 1500, // 1500 seconds = 25 minutes;
  };
  public startCountdown = () => {
    const interval = setInterval(this.decrementer, 1000);
    this.setState({ interval, isPaused: false });
    this.forceUpdate();
  };

  public componentDidMount() {
    this.startCountdown();
  }
  public pauseTimer = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: 0, isPaused: true });
  };

  public createButton = () => {
    return this.state.isPaused ? (
      <Button className={timerButton} onClick={this.startCountdown}>
        Resume
      </Button>
    ) : (
      <Button className={timerButton} onClick={this.pauseTimer}>
        Pause
      </Button>
    );
  };

  public decrementer = () => {
    const { timeLeft } = this.state;
    this.setState({ timeLeft: timeLeft - 1 });
  };

  public render() {
    const formattedTime = new Date(this.state.timeLeft * 1000).toISOString().substr(14, 5);

    return (
      <section className={timerDisplay}>
        <span className={timerText}>{formattedTime}</span>
        {this.createButton()}
      </section>
    );
  }
}

export default PomodoroTimer;
