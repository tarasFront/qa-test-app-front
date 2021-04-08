import { useDispatch } from 'react-redux';

import {
  logIn,
  register,
  googleRegister,
} from '../../redux/authorization/authorization-operations';

import styles from './AuthPage.module.css';
import googleLogo from './images/Group.svg';
import AuthForm from '../../components/AuthForm';

const AuthPage = () => {
  const dispatch = useDispatch();

  // submit function
  const handleSubmint = async (credentials, tegetName) => {
    switch (tegetName) {
      case 'signIn':
        console.log(tegetName, credentials.email, credentials.password);
        await dispatch(logIn(credentials));

        break;
      case 'signUp':
        console.log(tegetName, credentials.email, credentials.password);
        await dispatch(register(credentials));

        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeLogin}>
        <div className={styles.proTest}>
          <h1 className={styles.homeLoginTitle}>Pro Test</h1>
          <p className={styles.homeText}>
            <span className={styles.homeAccent}>[</span> We will help you find
            weak points in knowledge so that you can strengthen it. We will show
            you what is relevant to know for a QA Engineer and will try to make
            the learning process more diverse_
            <span className={styles.homeAccent}>]</span>
          </p>
        </div>
        <div className={styles.formRegister}>
          <p className={styles.authorizeTitle}>
            You can use your Google Account to authorize:
          </p>

          {/* <button onClick={() => dispatch(googleRegister())}> */}
          <a
            className={styles.buttonGoogleLink}
            href="http://localhost:3000/api/auth/google"
          >
            <button className={styles.buttonGoogle}>
              <img
                src={googleLogo}
                alt="Google logo"
                width="18px"
                height="18px"
              />
              &nbsp;
              <span>Google</span>
            </button>
          </a>

          <p className={styles.authorizeTitle}>
            Or login to our app using e-mail and password:
          </p>
          <AuthForm onSubmit={handleSubmint} />
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
