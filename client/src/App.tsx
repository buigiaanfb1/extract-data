import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Introduction from 'components/Introduction';
import { RouteMapping } from 'constant';
import Authenticate from 'components/Authenticate';
import Dashboard from 'components/Dashboard';
import { RequireAuth } from 'layouts/RequireAuth/RequireAuth';
import { useAuth } from 'hooks/useAuth';
import Guidelines from 'components/Guidelines';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import classes from './styles.module.scss';

function App() {
  const checkAuth = useAuth();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.page}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route
          path={`${RouteMapping.LOGIN}`}
          element={
            <Authenticate
              formType={RouteMapping.LOGIN}
              headerMessage="I don't have an account"
              title="Login"
            />
          }
        />
        <Route
          path={`${RouteMapping.SIGNUP}`}
          element={
            <Authenticate
              formType={RouteMapping.SIGNUP}
              headerMessage="I have an account"
              title="Sign up"
            />
          }
        />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guidelines" element={<Guidelines />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
