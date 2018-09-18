import React from 'react';

interface AppState {
  count: number;
  userName: string;
}

interface Pet {
  name: string;
  species: string;
  age: number;
  isGood: boolean;
}

interface MyComponentProps {
  name: string;
  age: number;
  pet?: Pet;
  location: string;
}

// You could destructure Component from React in your import.
// import React, { Component } from 'react';
class App extends React.Component<{}, AppState> {
  public state: AppState = {
    count: 0,
    userName: 'Brent',
  };

  public render() {
    const props: MyComponentProps = {
      age: 28,
      location: 'Florida',
      name: this.state.userName,
      pet: {
        age: 3,
        isGood: true,
        name: 'Ringo',
        species: 'dog',
      },
    };
    return (
      <div>
        You've click the button {this.state.count} times
        <button onClick={this.incrementCount}>Click Me </button>
        <MyComponent {...props} />
      </div>
    );
  }

  private incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
}

// Since we've defined the interface for the props we can destructure them cleanly.
const MyComponent: React.SFC<MyComponentProps> = ({ age, name, pet, location }) => {
  return (
    <div>
      <h1>
        Hello, I am {name} from {location} and I'm {age} years old.
      </h1>
      {pet && (
        <p>
          I have a pet {pet.species} named {pet.name}. He is {pet.age} years old and
          {pet.isGood ? ' is well behaved' : ' misbehaves some times'}.
        </p>
      )}
    </div>
  );
};

const addTwo = (a: number, b: number): number => a + b;
window.console.log(addTwo(3, 4));

interface Person {
  name: string;
  age: number;
  favoriteFood: string;
  // Array of type "Person". The ? denotes that it can be undefined.
  siblings?: Person[];
}

const createPerson = (
  name: string,
  age: number,
  favoriteFood: string,
  siblings?: Person[]
): Person => ({
  age,
  favoriteFood,
  name,
  siblings,
});

window.console.log(createPerson('foo bar', 100, 'ice cream')); // Doesn't throw an error because siblings can be undefined.

export default App;
