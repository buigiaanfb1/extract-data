import Header from 'components/Header';
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { RouteMapping } from '../../constant';
import classes from './styles.module.scss';

const Introduction = () => {
  let navigate = useNavigate();

  const handleDirect = (routeString: string) => {
    navigate(`/${routeString}`);
  };

  return (
    <div>
      <Header />
      <div className={classes.background}></div>
      <div className={classes.introduction}>
        <h1>Welcome to Extract Data</h1>
        <p>
          Great tool to extract large amounts of data from the Google search
          results page
        </p>
        <button onClick={() => handleDirect(RouteMapping.LOGIN)}>Log In</button>
        <button onClick={() => handleDirect(RouteMapping.SIGNUP)}>
          Sign Up
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Introduction;
