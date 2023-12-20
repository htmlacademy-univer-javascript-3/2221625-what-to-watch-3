
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { fetchFilmCards, fetchPromoFilm, checkAuthAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-route';
import browserHistory from './browser-history';
store.dispatch(fetchFilmCards());
store.dispatch(fetchPromoFilm());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
