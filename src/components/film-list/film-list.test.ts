import { render, screen, fireEvent } from '@testing-library/react';
import FilmList from './film-list';
import { makeFakeFilmCard } from '../../utils/mocks';

import React from 'react';
import { withHistory } from '../../utils/mock-component';

describe('Component: FilmList', () => {
  it('should render correctly', () => {
    const mockFilmCards =[makeFakeFilmCard()]
    const preparedComponent = withHistory(React.createElement(FilmList , { filmComps: mockFilmCards }));
    render(preparedComponent);
    
    console.log(screen)
    expect(screen.getByText(mockFilmCards[0].name)).toBeInTheDocument();
  });

    it('should render all films', () => {
    const mockFilmCards =[makeFakeFilmCard(),makeFakeFilmCard(),makeFakeFilmCard()]
    const preparedComponent = withHistory(React.createElement(FilmList , { filmComps: mockFilmCards }));
    render(preparedComponent);
    expect(screen.getByText(mockFilmCards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCards[2].name)).toBeInTheDocument();
    });
 
});