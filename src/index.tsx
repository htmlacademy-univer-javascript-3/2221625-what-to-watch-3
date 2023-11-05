import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmReviews} from './mocks/films';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { fetchFilms, fetchPromoFilm } from './store/api-actions';

store.dispatch(fetchFilms())
store.dispatch(fetchPromoFilm())
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={filmReviews}/>
    </Provider>
  </React.StrictMode>
);
