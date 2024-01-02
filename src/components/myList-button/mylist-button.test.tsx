import { render,screen } from '@testing-library/react';
import MyListButton from './mylist-button';

asdads
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: MyListButton', () => {

  it('should render correctly', () => {

    const mockFakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<MyListButton FilmId={'id'}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
