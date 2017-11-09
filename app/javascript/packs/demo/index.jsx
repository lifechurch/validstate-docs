import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReactDOM from 'react-dom';

class Demo extends Component {
  render() {
    return (
      <h1>Validstate Demo Application</h1>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Demo />, document.body.appendChild(document.createElement('div')),
  )
})

