import { useAuth } from 'hooks/useAuth';
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { removeToken } from 'utils/getSetToken';
import classes from './styles.module.scss';

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();
  if (auth.user?.username === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const handleUserLogout = () => {
    removeToken('access_token');
    navigate('/');
  };

  let activeStyle = {
    color: 'white',
  };

  let activeClassName = 'underline';

  return (
    <div className={classes.wrapper}>
      <aside className={classes.wrapperMenu}>
        <h2>extractor</h2>
        <div className={classes.menu_list}>
          <ul>
            <li>
              <NavLink
                to="dashboard"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                My Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="history"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                History
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.footerMenu}>
          <div className={classes.logout}>
            <p onClick={() => handleUserLogout()}>Sign Out</p>
            <p>{auth.user?.email}</p>
          </div>
        </div>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
