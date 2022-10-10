import classes from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteMapping } from 'constant';

const History = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDirect = (routeString: string) => {
    navigate(`/${routeString}`);
  };

  return (
    <nav className={classes.nav}>
      <h1 onClick={() => handleDirect('')}>History</h1>
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

export default History;
