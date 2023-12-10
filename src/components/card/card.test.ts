import { render, screen, fireEvent } from '@testing-library/react';
import Card from './card';
import { makeFakeFilmCard } from '../../utils/mocks';
import { FilmCard } from '../../types/film';
import React from 'react';
import { withHistory } from '../../utils/mock-component';

describe('Component: Card', () => {
  it('should render correctly', () => {
    const mockFilmCard: FilmCard =makeFakeFilmCard()
    const preparedComponent = withHistory(React.createElement(Card , { cardProps: mockFilmCard }));
    render(preparedComponent);
    const linkElement = screen.getByRole('link', { name: mockFilmCard.name });
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(linkElement).toHaveClass('small-film-card__link');
    
  });

  it('should render VideoPlayer on hover', async () => {
    const mockFilmCard: FilmCard = makeFakeFilmCard();
    const preparedComponent = withHistory(React.createElement(Card , { cardProps: mockFilmCard }));
    render(preparedComponent);
    const imgTestID="imgTestID "+mockFilmCard.id
    const videoTestID="videoTestID "+mockFilmCard.id
    
    fireEvent.mouseEnter(screen.getByTestId(imgTestID));

    await new Promise((resolve) => setTimeout(resolve, 1100));
    
    expect(screen.getByTestId(videoTestID)).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId(videoTestID));
    expect(screen.getByTestId(imgTestID)).toBeInTheDocument();

    
    
  });
  it("shouldn't render VideoPlayer on hover", async () => {
    const mockFilmCard: FilmCard = makeFakeFilmCard();
    const preparedComponent = withHistory(React.createElement(Card , { cardProps: mockFilmCard }));
    render(preparedComponent);
    const imgTestID="imgTestID "+mockFilmCard.id
    const videoTestID="videoTestID "+mockFilmCard.id
    
    fireEvent.mouseEnter(screen.getByTestId(imgTestID));

    await new Promise((resolve) => setTimeout(resolve, 950));
    
    expect(screen.queryByTestId(videoTestID)).not.toBeInTheDocument();
    expect(screen.getByTestId(imgTestID)).toBeInTheDocument();
  });
 
});