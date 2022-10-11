import classes from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteMapping } from 'constant';
import Upload from 'components/atoms/Upload';
import KeywordsTable from './components/KeywordsTable';

const Dashboard = () => {
  return (
    <div>
      <h2>Let's extract</h2>
      <div className={classes.wrapper}>
        <Upload />
        <KeywordsTable />
      </div>
    </div>
  );
};

export default Dashboard;
