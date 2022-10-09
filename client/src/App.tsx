import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import Introduction from 'components/Introduction';
import { RouteMapping } from 'constant';
import classes from './styles.module.scss';
import Authenticate from 'components/Authenticate';

function App() {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
