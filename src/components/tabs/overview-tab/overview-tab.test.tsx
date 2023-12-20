import { render,screen } from '@testing-library/react';
import OverviewTab from './overview-tab';


import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: OverviewTab', () => {

  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockFakeOwerviewProps = {
      score: 3,
      ratingCount: 3,
      description: 'test',
      director: 'Bob',
      starring: ['Bob','obo','Zak','Zek','Zuk','Zok','Zyk'],
    };

    const withHistoryComponent = withHistory(<OverviewTab {...mockFakeOwerviewProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    const starringElement = screen.getByTestId('owerview Starring');
    const expectedStarringText = 'Starring: Bob, obo, Zak, Zek and other';

    expect(starringElement.textContent).toBe(expectedStarringText);

    expect(screen.getByText(mockFakeOwerviewProps.description)).toBeInTheDocument();
  });

  it('should getBaDRating correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockFakeOwerviewProps = {
      score: 3,
      ratingCount: 3,
      description: 'test',
      director: 'Bob',
      starring: ['Bob','obo','Zak','Zek','Zuk','Zok','Zyk'],
    };

    const withHistoryComponent = withHistory(<OverviewTab {...mockFakeOwerviewProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);


    expect(screen.getByText('Bad')).toBeInTheDocument();
  });
  it('should getGoodRating correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockFakeOwerviewProps = {
      score: 5,
      ratingCount: 3,
      description: 'test',
      director: 'Bob',
      starring: ['Bob','obo','Zak','Zek','Zuk','Zok','Zyk'],
    };

    const withHistoryComponent = withHistory(<OverviewTab {...mockFakeOwerviewProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);


    expect(screen.getByText('Good')).toBeInTheDocument();
  });
  it('should getVeryGoodRating correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockFakeOwerviewProps = {
      score: 8,
      ratingCount: 3,
      description: 'test',
      director: 'Bob',
      starring: ['Bob','obo','Zak','Zek','Zuk','Zok','Zyk'],
    };

    const withHistoryComponent = withHistory(<OverviewTab {...mockFakeOwerviewProps}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);


    expect(screen.getByText('Very good')).toBeInTheDocument();
  });
});
