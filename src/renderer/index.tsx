import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { SinkFactory } from 'redux-sink';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { App } from './app';
import { createNavigationHistory } from '@sinks/navigation/navigation-sink';
import { Home } from '@containers/home';

import 'antd/dist/antd.css';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools }
});

const history = createNavigationHistory([
  {
    key: 'home',
    icon: 'home',
    link: '/home',
    props: {
      path: '/home',
      component: Home
    }
  }
]);

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
