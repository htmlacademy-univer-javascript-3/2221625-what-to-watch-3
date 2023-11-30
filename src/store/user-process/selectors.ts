import { Namespace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: Pick<State, Namespace.User>): AuthorizationStatus => state[Namespace.User].authorizationStatus;
export const getAvatarUrl = (state: Pick<State, Namespace.User>): string => state[Namespace.User].avatarUrl;
export const getHasError = (state: Pick<State, Namespace.User>): boolean => state[Namespace.User].hasError;
