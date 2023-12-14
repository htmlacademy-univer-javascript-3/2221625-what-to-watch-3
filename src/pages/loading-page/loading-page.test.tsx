import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Component: Loading screen', () => {
  it('should render correct', () => {

    render(<LoadingPage />);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();


    expect(loaderElement).toHaveClass('loader');
  });
});
