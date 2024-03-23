import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index';
import App from './components/App';
import store from './services/index';
import { messagesApi } from './services/messagesApi';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.scss';

export default async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: ['ru', 'en'],
    });

  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draftPosts) => {
        draftPosts.push(msg);
      }),
    );
    console.log(store.getState().messages.queries);
  });

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};
