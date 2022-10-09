import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import Introduction from 'components/Introduction';
import { RouteMapping } from 'constant';
import classes from './styles.module.scss';
import Authenticate from 'components/Authenticate';
import { getToken } from 'utils/getSetToken';
import Dashboard from 'components/Dashboard';
import { RequireAuth } from 'utils/RequireAuth';
import { useAuth } from 'hooks/useAuth';

function App() {
  useAuth();

  return (
    <div className={classes.page}>
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
