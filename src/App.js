import React from 'react';
import TitleBar from '../src/componnets/layout/titleBar/index';
import Content from '../src/componnets/layout/content/index';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/rootStore';

function App() {
  return (
    <Provider store={store}>
    <div className="app">
      <TitleBar/>
      <Content/>
    </div>
    </Provider>
  );
}

export default App;
