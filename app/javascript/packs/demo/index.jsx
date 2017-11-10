import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReactDOM from 'react-dom';

//App
import reducers from './reducers';
import BasicForm from './components/BasicForm';

const customMiddleWare = config => store => next => action => {
  console.log("Middleware triggered:", action, config.value);
  next(action);
}

const store = createStore(reducers,{}, applyMiddleware(ReduxThunk, customMiddleWare(testConfig)));

class Demo extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicForm />
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Demo />, document.body.appendChild(document.createElement('div')),
  )
})

