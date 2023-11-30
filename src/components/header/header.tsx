import {useAppSelector} from '../../hooks';
import { Link } from 'react-router-dom';
import { store } from '../../store/index';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';


import { getAuthorizationStatus, getAvatarUrl } from '../../store/user-process/selectors';


function Header(props: React.PropsWithChildren<object>): JSX.Element{
  
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const avatarUrl = useAppSelector(getAvatarUrl);
  function logoutClick() {
    store.dispatch(logoutAction());
  }
  const navigate = useNavigate();
  function avatarClick() {
    navigate('mylist');
  }
  return(
    <>
      <h1 className="visually-hidden">WTW</h1>


      <header className="page-header user-page__head">
        <div className="logo">
          <Link to='/' className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        {props.children}

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={avatarUrl} alt="User avatar" width="63" height="63" onClick={avatarClick}/>
            </div>
          </li>
          <li className="user-block__item">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <a className="user-block__link" onClick={logoutClick}>Sign out</a>
            ) : (
              <Link to="/login" className="user-block__link">Sign in</Link>
            )}
          </li>
        </ul>

      </header>

    </>
  );
}

export default Header;
