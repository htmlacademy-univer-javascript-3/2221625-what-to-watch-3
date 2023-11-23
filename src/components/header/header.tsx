import {useAppSelector} from '../../hooks';
import { Link } from 'react-router-dom';
import { store } from '../../store/index';
import { logoutAction  } from '../../store/state-api-actions';
import { AuthorizationStatus } from '../../const';


function Header(): JSX.Element{
    const authorizationStatus=useAppSelector((state)=>state.authorizationStatus);


    function logoutClick() {
        store.dispatch(logoutAction());
      }
    return(
        <>
        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
        <div className="logo">
            <Link to='/' className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
            </Link>
        </div>
        {authorizationStatus === AuthorizationStatus.Auth ? (
        <ul className="user-block">
            <li className="user-block__item">
            <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
            </li>
            <li className="user-block__item">
            <a className="user-block__link" onClick={logoutClick}>Sign out</a>

            </li>
        </ul>
                ) : (
            
            <ul className="user-block">
            <li className="user-block__item">
            <div className="user-block__avatar">
                <img src="img/avatarWhat.jpg" alt="?" width="63" height="63" />
            </div>
            </li>
            <li className="user-block__item">
            <Link to="/login" className="user-block__link">Sign in</Link>

            </li>
        </ul>
           

    )}
        </header>
        </>
    )
}

export default Header