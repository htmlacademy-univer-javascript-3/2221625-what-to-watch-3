import { render,screen } from '@testing-library/react';
import ReviewComp from './review';


import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeReview, makeFakeStore } from '../../utils/mocks';

describe('Component: ReviewComp', () => {

  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const mockFakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewComp {...mockReview}/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReview.user)).toBeInTheDocument();
  });
});
