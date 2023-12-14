import { render,screen,fireEvent } from '@testing-library/react';
import Tabs from './tabs';


import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCurrentFilm, makeFakeReview, makeFakeStore } from '../../utils/mocks';


describe('Component: ReviewComp', () => {

  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockCurrentFilm = makeFakeCurrentFilm();
    const mockReview = makeFakeReview();
    const withHistoryComponent = withHistory(<Tabs currentFilmComp={mockCurrentFilm} currentReviews={[mockReview]}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByTestId('posterContainer')).toBeInTheDocument();


  });

  it('should choose tab correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockCurrentFilm = {...makeFakeCurrentFilm(), description:'test'};

    const mockReview = makeFakeReview();
    const withHistoryComponent = withHistory(<Tabs currentFilmComp={mockCurrentFilm} currentReviews={[mockReview]}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);


    expect(screen.getByText('Overview').parentElement).toHaveClass('film-nav__item--active');
    expect(screen.getByTestId('owerview Direcrtor')).toBeInTheDocument();
    expect(screen.getByTestId('owerview Starring')).toBeInTheDocument();
    expect(screen.getByText(mockCurrentFilm.description)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Details'));
    expect(screen.getByText('Overview').parentElement).not.toHaveClass('film-nav__item--active');
    expect(screen.getByText('Details').parentElement).toHaveClass('film-nav__item--active');
    expect(screen.getByTestId('details Direcrtor')).toBeInTheDocument();
    expect(screen.getByTestId('details Starring')).toBeInTheDocument();
    expect(screen.getByText(mockCurrentFilm.genre)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Reviews'));
    expect(screen.getByText('Details').parentElement).not.toHaveClass('film-nav__item--active');
    expect(screen.getByText('Reviews').parentElement).toHaveClass('film-nav__item--active');
    expect(screen.getByText(mockReview.user)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

  });
});
