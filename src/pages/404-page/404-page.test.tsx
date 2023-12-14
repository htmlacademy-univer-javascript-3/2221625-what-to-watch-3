import { render, screen } from '@testing-library/react';
import Page404 from './404-page';

describe('Component: Page404', () => {
  it('should render correct', () => {

    render(<Page404 />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
