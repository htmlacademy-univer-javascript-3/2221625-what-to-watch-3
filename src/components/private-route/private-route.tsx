import {Navigate} from 'react-router-dom';

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'}
type PrivateRouteProps = {

    authorizationStatus: AuthorizationStatus;
    children: JSX. Element;}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
    const {authorizationStatus, children} = props;
    return (
    authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to="/login"  />
);}
export default PrivateRoute;