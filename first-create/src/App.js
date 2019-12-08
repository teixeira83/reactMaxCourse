import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component{

state = {
  persons: [
    { id: 'sad1', name: 'Rafael', age: 28 },
    { id: 'asd3', name: 'Laryssa', age: 23 },
    { id: 'dsa1', name: 'Gatinho', age: 4 }, 
  ],
  otherState: 'some other value',
  showPersons: false
}

deletePersonHandler = (personIndex) => {
  // const persons = this.state.persons.slice();
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

nameChangeHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = {
    ...this.state.persons[personIndex]
  };

  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState( {persons: persons} );
}

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

render(){
  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1x solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };

  let persons = null;

  if(this.state.showPersons) {
    persons = (
      <div>
        {this.state.persons.map((person, index) => {
          return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangeHandler(event, person.id)}/>
        })}
      </div>
    );

    style.backgroundColor = 'red'
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black'
    }
  }

  return (
    <StyleRoot>
      <div className="App">
      <h1>Hello World!</h1>
      <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}
      </div>
    </StyleRoot>
  );
  }
}

export default Radium(App);
