export enum APIRoute {
    Films = '/films',
    Reviews='/comments',
    PromoFilm = '/promo',
    Login = '/login',
    Logout = '/logout' ,
    Favorite='/favorite'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
    Data = 'DATA',
    User = 'USER',
  }
