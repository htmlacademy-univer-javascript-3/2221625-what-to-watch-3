import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    const mockFakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<LoadingPage />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);


    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
