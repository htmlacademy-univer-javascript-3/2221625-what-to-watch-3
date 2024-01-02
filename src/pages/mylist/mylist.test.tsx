import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MyList from './mylist';
import { makeFakeFilmCard, makeFakeStore } from '../../utils/mocks';


describe('Component: Player', () => {
  it('should render correctly', () => {
    const mockFilmCards = makeFakeFilmCard();
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        favoriteFilms: [mockFilmCards],

      },
    });
    const { withStoreComponent } = withStore(<MyList />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards.name)).toBeInTheDocument();
  });
});
