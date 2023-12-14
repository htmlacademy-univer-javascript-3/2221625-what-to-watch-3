import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen} from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.MyList);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';

    const mockFakeStore = makeFakeStore({
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.NoAuth,

      },
    });

    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={withStore(
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>,
            mockFakeStore
          ).withStoreComponent}
        />
      </Routes>,
      mockHistory
    );
    render(withHistoryComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';

    const mockFakeStore = makeFakeStore({
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.Auth,

      },
    });

    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={withStore(
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>,
            mockFakeStore
          ).withStoreComponent}
        />
      </Routes>,
      mockHistory
    );
    render(withHistoryComponent);
    expect(screen.getByText(notExpectedText)).toBeInTheDocument();
    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  });

});
