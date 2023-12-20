import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Main from './main';
import { fakeFilmCards, makeFakeCurrentFilm, makeFakeStore } from '../../utils/mocks';


describe('Component: Player', () => {
  it('should render correctly', () => {
    const mockFilmCards = fakeFilmCards;
    const mockFakePromoFilm = makeFakeCurrentFilm();
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        promoFilm: mockFakePromoFilm,
        filtredFilmComps: mockFilmCards.slice(0,8),
      },
    });
    const { withStoreComponent } = withStore(<Main />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockFilmCards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[3].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[4].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[5].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[6].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[7].name)).toBeInTheDocument();
    expect(screen.queryByText(mockFilmCards[8].name)).not.toBeInTheDocument();
    expect(screen.getByText(mockFakePromoFilm.name)).toBeInTheDocument();
    const playButton = screen.getByTestId('play-button');
    expect(playButton).toBeInTheDocument();
  });

});
