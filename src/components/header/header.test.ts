import { render,screen } from '@testing-library/react';
import Header from './header';
import { MemoryHistory, createMemoryHistory } from 'history';

import React from 'react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: Header', () => {
     
  it('should render correctly', () => {
    
    const withHistoryComponent = withHistory(React.createElement(Header, {}, React.createElement('p', {}, 'header')));
    const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore()
      );

    render(withStoreComponent);

    expect(screen.getByText('header')).toBeInTheDocument();

    
   
  });

  it('should Auth render correctly', () => {
    
    const withHistoryComponent = withHistory(React.createElement(Header, {}, React.createElement('p', {}, 'header')));
    const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore({
        USER: {
            ...makeFakeStore().USER,  
            authorizationStatus: AuthorizationStatus.Auth,  
            },
        })
      );

    render(withStoreComponent);
   

   

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
   
  });

  it('should No Auth render correctly', () => {
    
    const withHistoryComponent = withHistory(React.createElement(Header, {}, React.createElement('p', {}, 'header')));
    const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore({
        USER: {
            ...makeFakeStore().USER,  
            authorizationStatus: AuthorizationStatus.NoAuth,  
            },
        })
      );

    render(withStoreComponent);
    

    const signInLink = screen.getByTestId('sign-in-link');
    expect(signInLink).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
   
  });
   
 
});