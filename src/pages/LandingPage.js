import {CssBaseline, Container,Typography, Button, Grid } from'@material-ui/core';

const LandingPage = () => {
  return (
    <>  
      <CssBaseline/>
      <Container maxWidth="lg">
        <Grid conatiner>
          <Grid item>
            <Typography variant = "h4">Welcome to School Kit Landing Page</Typography>
            <Button>Hey</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
 
export default LandingPage;