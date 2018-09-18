import React, { SFC } from 'react';

import { display } from './UserGreeting.less';

interface UserGreetingProps {
  userName: string;
}

// SFC(Stateless Functional Component) is just an alias for Stateless Component
const UserGreeting: SFC<UserGreetingProps> = ({ userName }) => (
  <div className={display}>Hello, {userName}</div>
);

export default UserGreeting;
