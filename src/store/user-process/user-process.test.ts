import { AuthorizationStatus } from '../../const';
import { makeFakeAvatarURL,makeFakeAuthData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  

  it('should return initial state, with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, avatarUrl: "", hasError: false};
    const result = userProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state, with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, avatarUrl: "img/avatarWhat.jpg", hasError: false};
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should set "authorizationStatus" to "Auth","avatarUrl" to path, hasError to false, with "checkAuthAction.fulfilled" action', () => {
    const mockAvatarURL = makeFakeAvatarURL();
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: "", hasError: false};
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarURL, hasError: false};
    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(
        mockAvatarURL, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", hasError to false, with "checkAuthAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, avatarUrl: "", hasError: false};
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: "", hasError: false};
    const result = userProcess.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });


  it('should set "authorizationStatus" to "Auth","avatarUrl" to path, hasError to false, with "loginAction.fulfilled" action', () => {
    const mockAvatarURL = makeFakeAvatarURL();
    const mockAuthData = makeFakeAuthData();
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: "", hasError: false};
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarURL, hasError: false};
    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(
        mockAvatarURL,'', mockAuthData )
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", hasError to true, with "loginAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, avatarUrl: "", hasError: false};
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: "", hasError: true};

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth","avatarUrl" to "img/avatarWhat.jpg" with "logoutAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, avatarUrl: "", hasError: false};
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: "img/avatarWhat.jpg", hasError: false};

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});