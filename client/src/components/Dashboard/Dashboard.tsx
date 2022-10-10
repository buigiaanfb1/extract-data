import classes from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteMapping } from 'constant';
import Upload from 'components/atoms/Upload';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Upload />
    </div>
  );
};

export default Dashboard;
