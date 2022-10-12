import classes from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteMapping } from 'constant';

const Guidelines = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDirect = (routeString: string) => {
    navigate(`/${routeString}`);
  };

  return (
    <nav className={classes.nav}>
      <div>
        <h1>Guidelines</h1>
        <br />
        <h5>
          First of all, welcome to my page! This app will helps you crawl the
          result info of the keyword that you upload to the server.
        </h5>

        <p>
          When you upload a .csv file, it will take a while to crawl the data
          for you. So be patient!
        </p>
      </div>
      {pathname === '/' && (
        <div className={classes.menu}>
          <button onClick={() => handleDirect(RouteMapping.LOGIN)}>
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default Guidelines;
