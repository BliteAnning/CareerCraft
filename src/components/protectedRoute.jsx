
import { Route, Redirect } from 'react-router';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const userId = localStorage.getItem("userId");

    return (
        <Route
            {...rest}
            render={props =>
                userId ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;