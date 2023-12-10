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

export enum Namespace {
    Data = 'DATA',
    User = 'USER',
  }

export enum AppRoute {
  Login = '/login',
  MyList = '/mylist',
  Page404 = '/*',
  Main = '/',
  MoviePage = '/films/:id',
  AddReview='/films/:id/addreview',
  Player='/player/:id'
}