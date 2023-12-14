import { render,screen } from '@testing-library/react';
import DetailTab from './details-tab';


import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: ReviewComp', () => {

  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockFakeDetailProps = {
      director: 'Bob',
      starring: ['Bob','obo','Zak','Zek','Zuk','Zok','Zyk'],
      runtime: 3,
      genre: 'comedy',
      date: 7,
    };

    const withHistoryComponent = withHistory(<DetailTab {...mockFakeDetailProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);
    expect(screen.getByText(mockFakeDetailProps.genre)).toBeInTheDocument();
    expect(screen.getByTestId('formattedActors').textContent).toBe('Bob,  obo,  Zak,  Zek,  Zuk,  Zok,  Zyk');
  });
});
