import { render, screen,fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Player from './player';
import { makeFakeCurrentFilm, makeFakeStore } from '../../utils/mocks';

describe('Component: Player', () => {
  it('should render correctly', () => {
    const mockCurrentFilm = makeFakeCurrentFilm();
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        currentFilm: mockCurrentFilm,

      },
    });
    const { withStoreComponent } = withStore(<Player />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);


    expect(screen.getByText(mockFakeStore.DATA.currentFilm.name)).toBeInTheDocument();

  });
  it('should toggle play/pause correctly', () => {
    const mockCurrentFilm = makeFakeCurrentFilm();
    const mockFakeStore = makeFakeStore({
      DATA: {
        ...makeFakeStore().DATA,
        currentFilm: mockCurrentFilm,
      },
    });
    const { withStoreComponent } = withStore(<Player />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const playPauseButton = screen.getByTestId('play-pause-button');

    expect(playPauseButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();

    fireEvent.click(playPauseButton);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();

    fireEvent.click(playPauseButton);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
  });


});
