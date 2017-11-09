import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReactDOM from 'react-dom';

//App
import reducers from './reducers';
import BasicForm from './components/BasicForm';

const customMiddleWare = store => next => action => {
  console.log("Middleware triggered:", action);
  next(action);
}

const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));

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

