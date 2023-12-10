import { render,screen,waitFor  } from '@testing-library/react';
import ListGenresFilms from './list-genres-films';

import React from 'react';
import { withHistory, withStore } from '../../utils/mock-component';
import { fakeFilmCards, makeFakeStore } from '../../utils/mocks';

describe('Component: ListGenresFilms', () => {
     
  it('should render correctly', async () => {
    const mockFakeFilmCards=fakeFilmCards
    const mockFakeStore= makeFakeStore({
        DATA: {
            ...makeFakeStore().DATA,  
            filmCards: mockFakeFilmCards,
            
            },
        }) 
    const withHistoryComponent = withHistory(React.createElement(ListGenresFilms, { activeTab: 'All Genres' }));
    const { withStoreComponent } = withStore(
        withHistoryComponent,
        mockFakeStore
      );
      
    render(withStoreComponent);
    await waitFor(() => {
        console.log(mockFakeStore.DATA.filtredFilmComps)
        expect(screen.getByText(mockFakeFilmCards[0].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[1].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[2].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[3].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[4].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[5].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[6].name)).toBeInTheDocument();
        expect(screen.getByText(mockFakeFilmCards[7].name)).toBeInTheDocument();
    });
  });
});