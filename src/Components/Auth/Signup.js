import React, { useState} from 'react';
import { TextField, Button, Container, Typography, Grid, InputAdornment, Link, Checkbox, FormControl, FormControlLabel, FormGroup, Box, IconButton, createTheme, ThemeProvider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff2557',
      light: '#ff83a3',
    },
    matteBlack: {
      main: '#1f1f1f',
    },
    grayish: {
      main: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleContinueWithApple = () => {
    alert('Continue with Apple clicked');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="100vw" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
        <div>
        <Box style={{ width: '100%', maxWidth: '410px', textAlign: 'center' }}>
        <Typography component="h1" variant="h3" gutterBottom style={{ fontWeight: 'bold', margin:'1.5rem 0'}}>
           locaidad
          </Typography>
          <Typography component="h1" variant="h5" gutterBottom style={{ fontWeight: 'bold', margin:'1rem 0' }}>
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="User Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        '&:focus': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        height: '3rem',
                      },
                      '& .MuiInputBase-input': {
                        padding: '10px 14px',
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        '&:focus': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        height: '3rem',
                      },
                      '& .MuiInputBase-input': {
                        padding: '10px 14px',
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            aria-label="toggle password visibility"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        '&:focus': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        height: '3rem',
                      },
                      '& .MuiInputBase-input': {
                        padding: '10px 14px',
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        style={{fontSize:'10px'}}
                        checked={isAgreed}
                          onChange={handleCheckboxChange}
                          name="agreement"
                          sx={{
                            color:theme.palette.primary.main,
                            '& .Mui-checked': {
                              color: '#ff2557',
                            },
                          }}
                        />
                      }
                      label="I have read and agree to the Privacy Policy and Terms and Conditions"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '0.5rem',
                    borderRadius: '50px',
                    backgroundColor: isAgreed ? theme.palette.primary.main : theme.palette.primary.light,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: isAgreed ? theme.palette.primary.light : theme.palette.primary.main,
                    },
                    height: '2.75rem',
                  }}
                  disabled={!isAgreed}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="matteBlack"
                  style={{
                    marginTop: '0.25rem',
                    borderRadius: '50px',
                    height: '2.75rem',
                    color: theme.palette.grayish.main,
                  }}
                  startIcon={<AppleIcon />}
                  onClick={handleContinueWithApple}
                >
                  Continue with Apple
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#ff2557' }} onClick={() => navigate('/login')}>
                    Login
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
        <div className='container' style={{ marginTop: '1rem' }}>
            <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <Link href="#" color="inherit">
                  <Typography variant="body2">About the App</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <Typography variant="body2">Terms and Conditions</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <Typography variant="body2">Privacy Policy</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <Typography variant="body2">Imprint</Typography>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
