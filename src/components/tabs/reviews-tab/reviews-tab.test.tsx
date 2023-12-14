import { render,screen } from '@testing-library/react';
import ReviewsTab from './reviews-tab';


import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeReview, makeFakeStore } from '../../../utils/mocks';

describe('Component: ReviewsTab', () => {

  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const mockReview = makeFakeReview();

    const withHistoryComponent = withHistory(<ReviewsTab reviews={[mockReview]} />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

  });
});
