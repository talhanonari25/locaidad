import React from 'react';
import { TextField, Button, Container, Typography, Grid, InputAdornment, Link, FormControl, Box, createTheme, ThemeProvider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
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

const ForgotPass = () => {
  const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="100vw" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
        <div>
        <Box style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography component="h1" variant="h3" gutterBottom style={{ fontWeight: 'bold', margin:'1.5rem 0'}}>
           locaidad
          </Typography>
          <Typography component="h1" variant="h5" gutterBottom style={{ fontWeight: 'bold', margin:'1.5rem 0' }}>
            Reset Your Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '0.5rem',
                    borderRadius: '50px',
                    backgroundColor: '#ff2557',
                    color: 'white',
                    height: '2.75rem',
                  }}
                >
                  Forgotten Password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                Want to Login?{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#ff2557' }} onClick={() => navigate('/login')}>
                    Login
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
        <div className='container' style={{ marginTop: '2rem' }}>
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

export default ForgotPass;
