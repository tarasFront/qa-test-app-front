import { useEffect, Suspense, useState, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';
import PublicRoute from './components/Routes/PublicRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
import { getIsFetchingCurrentUser } from './redux/authorization/authorization-selectors';
import { fetchCurrentUser } from './redux/authorization/authorization-operations';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import ResultsPage from './components/Results/Results';
import Footer from './components/Footer';
import UsefullInfo from './components/UsefullInfo/UsefullInfo';
import TestPage from './views/TestPage/TestPage';

import {
  books,
  resources,
} from './components/UsefullInfo/usefullMaterials.json';

const MainPageView = lazy(() =>
  import(
    './views/MainPageView/MainPageView' /* webpackChunkName: "main-page" */
  ),
);
const AuthPage = lazy(() =>
  import('./views/AuthPage' /* webpackChunkName: "auth-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage' /* webpackChunkName: "auth-page" */),
);

function App() {
  const [typeQuestions, setTypeQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);

  const isFetchingCurrentUser = useSelector(getIsFetchingCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <Switch>
            <Suspense fallback={<Loader />}>
              <PrivateRoute path="/" exact redirectTo="/auth">
                <MainPageView
                  setTypeQuestions={setTypeQuestions}
                ></MainPageView>
              </PrivateRoute>

              <PublicRoute path="/auth" restricted redirectTo="/">
                <AuthPage />
              </PublicRoute>

              <PrivateRoute path="/test" redirectTo="/auth">
                <TestPage
                  typeQuestions={typeQuestions}
                  setTypeQuestions={setTypeQuestions}
                  answers={answers}
                  setAnswers={setAnswers}
                ></TestPage>
              </PrivateRoute>

              <PublicRoute path="/results" redirectTo="/auth">
                {<ResultsPage />}
              </PublicRoute>

              <PrivateRoute path="/useful-info" redirectTo="/auth">
                <UsefullInfo books={books} resources={resources} />
              </PrivateRoute>

              <PublicRoute path="/contacts">
                <ContactsPage />
              </PublicRoute>

              <PrivateRoute>
                <Redirect to="/" />
              </PrivateRoute>
            </Suspense>
          </Switch>
          <ToastContainer transition={Flip} />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
