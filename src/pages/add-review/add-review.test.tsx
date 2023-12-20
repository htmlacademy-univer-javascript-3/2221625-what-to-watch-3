import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import AddReview from './add-review';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: AuthScreen', () => {
  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const reviewText = 'Review text';
    const { withStoreComponent } = withStore(<AddReview />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);


    expect(screen.getByText(reviewText)).toBeInTheDocument();
    expect(screen.getByTestId('test-star6')).toBeChecked();
  });

  it('should render correctly when user enter reviewText adn change rating', async () => {

    const mockFakeStore = makeFakeStore();
    const reviewText = 'test test test test test test test test test test test test test test test test test test test test test test';
    const { withStoreComponent } = withStore(<AddReview />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);
    await userEvent.clear(screen.getByTestId('textarea-test'));
    await userEvent.type(
      screen.getByTestId('textarea-test'),

      reviewText,
    );
    await userEvent.click(screen.getByTestId('test-star10'));
    expect(screen.getByDisplayValue(reviewText)).toBeInTheDocument();
    expect(screen.getByTestId('test-star10')).toBeChecked();
    expect(screen.getByTestId('submitButton')).toBeEnabled();
  });
  it('should render uncorrectly when user enter reviewText adn change rating', async () => {

    const mockFakeStore = makeFakeStore();
    const reviewText = 'test test';
    const { withStoreComponent } = withStore(<AddReview />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);
    await userEvent.clear(screen.getByTestId('textarea-test'));
    await userEvent.type(
      screen.getByTestId('textarea-test'),

      reviewText,
    );
    await userEvent.click(screen.getByTestId('test-star10'));
    expect(screen.getByDisplayValue(reviewText)).toBeInTheDocument();
    expect(screen.getByTestId('test-star10')).toBeChecked();
    expect(screen.getByTestId('submitButton')).toBeDisabled();
  });


});
