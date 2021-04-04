import { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PublicRoute from './components/Routes/PublicRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
import { getIsFetchingCurrentUser } from './redux/authorization/authorization-selectors';
import { fetchCurrentUser } from './redux/authorization/authorization-operations';
import './App.css';

function App() {
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <p>Loader</p>
      ) : (
        <>
          {/* <AppBar /> */}
          <Switch>
            <Suspense fallback={<p>Loader</p>}>
              <PrivateRoute path="/" exact redirectTo="/auth">
                {/* <MainPage /> */}
              </PrivateRoute>

              <PublicRoute path="/auth" restricted redirectTo="/">
                {/* <AuthorizationPage /> */}
              </PublicRoute>

              <PrivateRoute path="/test" redirectTo="/auth">
                {/* <TestPage /> */}
              </PrivateRoute>

              <PrivateRoute path="/results" redirectTo="/auth">
                {/* <ResultsPage /> */}
              </PrivateRoute>

              <PrivateRoute path="/useful-info" redirectTo="/auth">
                {/* <InformationPage /> */}
              </PrivateRoute>

              <PublicRoute path="/contacts">
                {/* <ContactsPage /> */}
              </PublicRoute>

              <Route>
                <Redirect to="/auth" />
              </Route>
            </Suspense>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;