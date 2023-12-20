import { render, screen, fireEvent,act } from '@testing-library/react';
import Card from './card';
import { makeFakeFilmCard } from '../../utils/mocks';
import { FilmCard } from '../../types/film';
import { withHistory } from '../../utils/mock-component';

describe('Component: Card', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render correctly', () => {
    const mockFilmCard: FilmCard = makeFakeFilmCard();
    const preparedComponent = withHistory(<Card cardProps={mockFilmCard} />);
    render(preparedComponent);
    const linkElement = screen.getByRole('link', { name: mockFilmCard.name });
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(linkElement).toHaveClass('small-film-card__link');

  });

  it('should render VideoPlayer on hover', () => {
    const mockFilmCard: FilmCard = makeFakeFilmCard();
    const preparedComponent = withHistory(<Card cardProps={mockFilmCard} />);
    render(preparedComponent);
    const imgTestID = `imgTestID ${ mockFilmCard.id}`;
    const videoTestID = `videoTestID ${ mockFilmCard.id}`;
    fireEvent.mouseEnter(screen.getByTestId(imgTestID));
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId(videoTestID)).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId(videoTestID));
    expect(screen.getByTestId(imgTestID)).toBeInTheDocument();


  });
  it('shouldn\'t render VideoPlayer on hover', () => {
    const mockFilmCard: FilmCard = makeFakeFilmCard();
    const preparedComponent = withHistory(<Card cardProps={mockFilmCard} />);
    render(preparedComponent);
    const imgTestID = `imgTestID ${ mockFilmCard.id}`;
    const videoTestID = `videoTestID ${ mockFilmCard.id}`;

    fireEvent.mouseEnter(screen.getByTestId(imgTestID));

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(screen.queryByTestId(videoTestID)).not.toBeInTheDocument();
    expect(screen.getByTestId(imgTestID)).toBeInTheDocument();
  });

});
