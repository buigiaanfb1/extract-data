import Upload from 'components/atoms/Upload';

import classes from './styles.module.scss';
import KeywordsTable from './components/KeywordsTable';

const Dashboard = () => {
  return (
    <div>
      <h2>Let's extract</h2>
      <p>
        When file are uploaded, please be patient due to the size of raw HTML
        too big too query.
      </p>
      <div className={classes.wrapper}>
        <Upload />
        <KeywordsTable />
      </div>
    </div>
  );
};

export default Dashboard;
