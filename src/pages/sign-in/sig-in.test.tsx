import { render, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import SignIn from './sign-in';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: AuthScreen', () => {
  it('should render correctly', () => {
    const mockFakeStore = makeFakeStore({
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.Unknown,

      },
    });
    const loginText = 'Email address';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<SignIn />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);


    expect(screen.getByText(loginText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {

    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const mockFakeStore = makeFakeStore({
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.Unknown,

      },
    });
    const { withStoreComponent } = withStore(<SignIn />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {

    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks@mail.keks';
    const expectedPasswordValue = '123456';
    const mockFakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<SignIn />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should render mesaage when user enter login!=mail and password', async () => {

    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const mockFakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<SignIn />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );
    fireEvent.click(screen.getByTestId('SignButton'));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();

  });

  it('should render mesaage when hasError', async () => {

    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const mockFakeStore = makeFakeStore({
      USER: {
        ...makeFakeStore().USER,
        hasError:true
      },
    });
    const { withStoreComponent } = withStore(<SignIn />, mockFakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );
    fireEvent.click(screen.getByTestId('SignButton'));
    expect(screen.getByText('We can’t recognize this email and password combination. Please try again.')).toBeInTheDocument();

  });
});
