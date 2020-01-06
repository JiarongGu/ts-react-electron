import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { SinkFactory } from 'redux-sink';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { App } from '@containers';
import { WindowSink, NavigationSink } from '@sinks';

import 'antd/dist/antd.css';
import '@styles/global.scss';
import { homeRoute } from './containers/home/home-route';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools }
});

// initialize sinks
WindowSink.load(window);

const history = NavigationSink.createHistory([homeRoute]);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
