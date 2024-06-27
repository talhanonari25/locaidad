import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, InputAdornment, Link, Checkbox, FormControl, FormControlLabel, FormGroup, Box, IconButton, createTheme, ThemeProvider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    social_media_login: 1,
    login_with_google: true,
  });

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please Enter Email Address.");
      return;
    } else if (!password) {
      setError("Please Enter password.");
      return;
    }

    let save = { email, password };
    axios.post("http://184.72.214.148/auth/sign_in", save)
    .then((res) => {
        if (res.status === 200 && res.data.headers) {
          setEmail('');
          setPassword('');
          console.log('User Login Successfully!!!');
            const accessToken = res.data.headers['access-token'];
            const tokenType = res.data.headers['token-type'];
            const client = res.data.headers['client'];
            const expiry = res.data.headers['expiry'];
            const uid = res.data.headers['uid'];
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("token-type", tokenType);
            sessionStorage.setItem("client", client);
            sessionStorage.setItem("expiry", expiry);
            sessionStorage.setItem("uid", uid);
          navigate('/');
        } else {
            console.log("Error Message=>", res.data.message);
        }
    })
    .catch((err)=>{
      console.log(err.response.data.message)
    })

    const accessToken = sessionStorage.getItem("access-token");
    if (!accessToken) {
      navigate("/login");
    }
  };

  const handleContinueWithGoogle= useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

useEffect(() => {
  if (user && user.access_token) {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          first_name: res.data.given_name,
          last_name: res.data.family_name,
          email: res.data.email
        }));
      })
      .catch((err) => console.log(err));
  }
}, [user]);

useEffect(() => {
  if (formData.email !== '') {
    axios.post("http://184.72.214.148/auth/sign_in", formData)
    .then((res) => {
        if (res.status === 200 && res.data.headers) {
          console.log('User Login Successfully!!!');
          console.log(res)
          const accessToken = res.data.headers['access-token'];
          const tokenType = res.data.headers['token-type'];
          const client = res.data.headers['client'];
          const expiry = res.data.headers['expiry'];
          const uid = res.data.headers['uid'];
          sessionStorage.setItem("access-token", accessToken);
          sessionStorage.setItem("token-type", tokenType);
          sessionStorage.setItem("client", client);
          sessionStorage.setItem("expiry", expiry);
          sessionStorage.setItem("uid", uid);
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              social_media_login: 1,
              login_with_google: true,
            });
          navigate('/');
        } else {
            console.log("Error Message=>", res.data.message);
        }
    })
    .catch((err)=>{
      console.log(err.response.data.message)
    })
  
    const accessToken = sessionStorage.getItem("access-token");
    if (!accessToken) {
      navigate("/login");
    }
  }
}, [formData, navigate]);

  const handleContinueWithApple = () => {
    alert('Continue with Apple clicked');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="100vw" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
        <div>
        <Box style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography component="h1" variant="h3" gutterBottom style={{ fontWeight: 'bold', margin:'1rem 0'}}>
           locaidad
          </Typography>
          <Typography component="h1" variant="h5" gutterBottom style={{ fontWeight: 'bold', margin:'1.5rem 0' }}>
            Login to Your Account
          </Typography>
          {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
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
                    value={email}
                    onChange={handleInputChange}  
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
                    value={password}
                    onChange={handleInputChange}
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
                <Typography variant="body2" style={{ textAlign:'left' }}>
                Forgotten Password?{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#ff2557' }} onClick={() => navigate('/forgot')}>
                    Click Here
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '0.25rem',
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
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    marginTop: '0.25rem',
                    borderRadius: '50px',
                    height: '2.75rem',
                    color: theme.palette.grayish.main,
                    backgroundColor: '#0096FF',
                  }}
                  startIcon={<GoogleIcon />}
                  onClick={handleContinueWithGoogle}
                >
                  Continue with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    marginTop: '0.25rem',
                    borderRadius: '50px',
                    height: '2.75rem',
                    color: theme.palette.matteBlack.main,
                    backgroundColor:'#fff',
                  }}
                  startIcon={<AppleIcon />}
                  onClick={handleContinueWithApple}
                >
                  Continue with Apple
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                Don't have an account?{' '}
                  <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#ff2557' }} onClick={() => navigate('/signup')}>
                    Sign up
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

export default Login;
