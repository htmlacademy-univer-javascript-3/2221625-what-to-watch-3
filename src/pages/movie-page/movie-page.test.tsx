import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MoviePage from './movie-page';
import { fakeFilmCards, makeFakeCurrentFilm, makeFakeStore } from '../../utils/mocks';


describe('Component: Player', () => {
  it('should render correctly', () => {
    const mockFilmCards = fakeFilmCards;
    const mockFakeCurentFilm = makeFakeCurrentFilm();
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        currentFilm: mockFakeCurentFilm,
        currentFilmRecomends: mockFilmCards,

      },
    });
    const { withStoreComponent } = withStore(<MoviePage />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockFilmCards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[3].name)).toBeInTheDocument();
    expect(screen.queryByText(mockFilmCards[4].name)).not.toBeInTheDocument();
    expect(screen.getByText(mockFakeCurentFilm.name)).toBeInTheDocument();
    const playButton = screen.getByTestId('play-button');
    expect(playButton).toBeInTheDocument();
  });

});
