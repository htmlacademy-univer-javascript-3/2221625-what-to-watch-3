
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmReviews} from './mocks/films';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { fetchFilms, fetchPromoFilm  } from './store/film-api-actions';
import { checkAuthAction  } from './store/state-api-actions';
import { ToastContainer } from 'react-toastify';


store.dispatch(fetchFilms())
store.dispatch(fetchPromoFilm())
store.dispatch(checkAuthAction())
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App reviews={filmReviews}/>
    </Provider>
  </React.StrictMode>
);
