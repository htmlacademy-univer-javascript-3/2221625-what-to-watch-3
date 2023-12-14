import { render,screen } from '@testing-library/react';
import TabsGenres from './tabs-genres';

import React from 'react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { fireEvent } from '@testing-library/react';

describe('Component: TabsGenres', () => {

  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<TabsGenres/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText('All genres')).toBeInTheDocument();
    expect(screen.getByText('Fantasy')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Crime')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();

  });

  it('should choose tab correctly', () => {
    const mockFakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<TabsGenres/>);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      mockFakeStore
    );


    render(withStoreComponent);

    expect(screen.getByText('All genres').parentElement).toHaveClass('catalog__genres-item--active');
    fireEvent.click(screen.getByText('Fantasy'));
    expect(screen.getByText('All genres').parentElement).not.toHaveClass('catalog__genres-item--active');
    expect(screen.getByText('Fantasy').parentElement).toHaveClass('catalog__genres-item--active');
    fireEvent.click(screen.getByText('Comedy'));
    expect(screen.getByText('Fantasy').parentElement).not.toHaveClass('catalog__genres-item--active');
    expect(screen.getByText('Comedy').parentElement).toHaveClass('catalog__genres-item--active');

  });
});
