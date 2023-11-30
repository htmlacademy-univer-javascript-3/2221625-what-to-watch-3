import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
    children: JSX.Element;
  }

function PrivateRoute(props: PrivateRouteProps): JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { children} = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to="/login" />
  );
}
export default PrivateRoute;
