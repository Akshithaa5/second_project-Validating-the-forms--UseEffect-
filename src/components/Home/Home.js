import React, {useContext} from 'react';
 import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../Store/auth-context';

const Home = (props) => {
  const authCtx = useContext(AuthContext);
  // Destructure props
  const { onLogout } = props;

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      {/* Render the logout button only if onLogout is provided */}
      {onLogout && <Button onClick={authCtx.onLogout}>Logout</Button>}
    </Card>
  );
};


export default Home;
