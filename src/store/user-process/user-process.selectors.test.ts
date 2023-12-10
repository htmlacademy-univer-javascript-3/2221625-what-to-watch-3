import { AuthorizationStatus, Namespace } from '../../const';
import { UserProcess } from '../../types/state';
import {  getAuthorizationStatus, getAvatarUrl,getHasError } from './selectors';

describe('UserProcess selectors', () => {
    
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = { authorizationStatus:authorizationStatus,avatarUrl:"",hasError:false };

    const result = getAuthorizationStatus({ [Namespace.User]: state });

    expect(result).toBe(authorizationStatus);
  });

  it('should return avatarUrl from state', () => {
    const avatarUrl = "avatarUrl";
    const state: UserProcess = { authorizationStatus:AuthorizationStatus.Auth,avatarUrl:avatarUrl,hasError:false };

    const result = getAvatarUrl({ [Namespace.User]: state });

    expect(result).toBe(avatarUrl);
  });

  it('should return hasError from state', () => {
    const hasError = true;
    const state: UserProcess = { authorizationStatus:AuthorizationStatus.Auth,avatarUrl:"",hasError:hasError };

    const result = getHasError({ [Namespace.User]: state });

    expect(result).toBe(hasError);
  });
});