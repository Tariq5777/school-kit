import { CssBaseline, Container, Typography, Button, Grid } from '@material-ui/core';
import { useContext } from 'react';
import { Redirect } from 'react-router';
import { isAuthenticated } from '../helper/auth/authUtils';
import { UserStatusContext } from '../helper/UserStatusContext'
const LandingPage = () => {

  const { user, setUser } = useContext(UserStatusContext)

  if (isAuthenticated()) {
    setUser(true)
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid conatiner>
          <Grid item>
            <Typography variant="h4">Welcome to School Kit Landing Page</Typography>
            <Button>Hey</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingPage;