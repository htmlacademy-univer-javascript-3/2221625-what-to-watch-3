import { render } from '@testing-library/react';
import ListGenresFilms from './list-genres-films';

import React from 'react';
import { withHistory, withStore } from '../../utils/mock-component';
import { fakeFilmCards, makeFakeStore } from '../../utils/mocks';

describe('Component: ListGenresFilms', () => {

  it('should render correctly', () => {
    const mockFakeFilmCards = fakeFilmCards;
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        filmCards: mockFakeFilmCards,

      },
    });
    const withHistoryComponent = withHistory(React.createElement(ListGenresFilms, { activeTab: 'Comedy' }));
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

  });
});
