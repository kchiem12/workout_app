import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { Link } from 'react-router-dom';
import withRouter from '../components/withRouter';
import PasswordForget from '../components/PasswordForget';
// import { useNavigate } from 'react-router-dom';

import { auth, db } from '../Firebase';

function SignIn(props) {

  //Uses history to programatically change routes
  const { location, navigate, params} = props.router;


  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  //Generates a new user object
  const defaultUser = {
    id: null,
    email: '',
    password: '',
    error: null,
    auth: null
  };


  //Set state of the user
  const [user, setUser] = React.useState(defaultUser);

  const isValid = user.email === '' || user.password ==='';

  const handleSubmit = (event) => {
    event.preventDefault();
    
    //Authenticates login
    auth.signInWithEmailAndPassword(user.email, user.password).then(() => {

            //declares the current user
            var theUser = auth.currentUser;

            //add to database
            var database_ref = db.ref();
            
            var userData = {
                last_login: Date.now()
            };
    
            database_ref.child('users/' + theUser.uid).update(userData);
    
            //wipes the user in file
            setUser(defaultUser);

            //Switches page to dashboard
            navigate('/dashboard');
            

    }).catch(err => {
      setUser({...user, error: err.message});
      console.log(user.email);
      console.log(user.password);
    });
  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
              <Typography className='error'>
                {user.error ? user.error : ''}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <PasswordForget>
                </PasswordForget>
              </Grid>
              <Grid item>
                <Link to="/sign-up">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default withRouter(SignIn);