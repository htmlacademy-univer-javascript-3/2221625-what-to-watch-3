import { useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { getHasError } from '../../store/user-process/selectors';

function SignIn():JSX.Element{
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const hasError = useAppSelector(getHasError);
  const dispatch = useAppDispatch();

  const validateInput = (input: string): boolean => {
    return input.includes('@');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    
    evt.preventDefault();
    
    
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  
  const submitClick = () => {
    if(loginRef.current)
      setIsValid( validateInput(loginRef.current.value))
  };

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
        {(!isValid && !hasError) && (
            <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>
          )}
          {(hasError) && (
            <div className="sign-in__message">
             <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
          </div>
          )}
        
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" onClick={submitClick}>Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );

}
export default SignIn;
