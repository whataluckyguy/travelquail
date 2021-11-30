import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
);


const Enquiry = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './enquiry')
);

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            exact
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path={`${match.url}/forgot-password`}
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path={`${match.url}/reset-password`}
            render={(props) => <ResetPassword {...props} />}
          />
          <Route
            exact
            path={`${match.url}/enquiry`}
            render={(props) => <Enquiry {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
