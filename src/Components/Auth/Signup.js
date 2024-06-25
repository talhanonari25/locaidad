import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  InputAdornment,
  Link,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff2557",
      light: "#ff83a3",
    },
    matteBlack: {
      main: "#1f1f1f",
    },
    grayish: {
      main: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    gender: "",
    age: "",
    lat:"",
    long:"",
    code: "",
    date_of_birth: "",
    username: "",
    role:"regular",
    referral_code: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prevFormData => ({
            ...prevFormData,
            lat: position.coords.latitude,
            long: position.coords.longitude
          }));
        },
        (error) => {
          setError("Error getting location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.lat || !formData.long) {
      setError("Location is required. Please enable location services.");
      return;
    }
    else if (!formData.first_name) {
      setError("Please Enter First Name.");
      return;
    }
    else if (!formData.last_name) {
      setError("Please Enter Last Name.");
      return;
    }
    else if (!formData.username) {
      setError("Please Enter Username.");
      return;
    }
    else if (!formData.email) {
      setError("Please Enter Email Address.");
      return;
    }
    else if (!formData.password) {
      setError("Please Enter password.");
      return;
    }
    else if (formData.password!==formData.password_confirmation) {
      setError("Confirm password is Incorrect");
      return;
    }
    else if (!formData.code) {
      setError("Please Select Country Code");
      return;
    }
    else if (!formData.phone) {
      setError("Please Enter Phone Number");
      return;
    }
    else if (!formData.gender) {
      setError("Please Select your Gender.");
      return;
    }
    else if (!formData.age) {
      setError("Please Enter Age.");
      return;
    }
    else if (!formData.date_of_birth) {
      setError("Please Enter Date of Birth.");
      return;
    }
    axios
      .post("http://184.72.214.148/auth", formData)
      .then((res) => {
        console.log("You are registered!")
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          phone: "",
          gender: "",
          age: "",
          lat:"",
          long:"",
          code: "",
          date_of_birth: "",
          username: "",
          role:"regular",
          referral_code: "",
        });
        navigate('/login')
      })
      .catch((err) => {
        console.log(err.response.data.message)
      });
  };

  const handleContinueWithGoogle = () => {
    alert('Continue with Google clicked');
  };

  const handleContinueWithApple = () => {
    alert("Continue with Apple clicked");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="100vw"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "85vh",
        }}
      >
        <div style={{ width: "100%", maxWidth: "410px", textAlign: "center" }}>
          <Box style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Typography
              component="h1"
              variant="h3"
              gutterBottom
              style={{ fontWeight: "bold", margin: "1.5rem 0" }}
            >
              locaided
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold", margin: "1rem 0" }}
            >
              Create Your Account
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="User Name"
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
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
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    name="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
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
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="countryCode">Country Code</InputLabel>
                  <Select
                    fullWidth
                    variant="outlined"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    input={<OutlinedInput label="Country Code" />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
                      },
                      backgroundColor: theme.palette.grayish.main,
                    }}
                  >
                    <MenuItem value={"+1"}>+1</MenuItem>
                    <MenuItem value={"+92"}>+92</MenuItem>
                    <MenuItem value={"+44"}>+44</MenuItem>
                    {/* Add more country codes as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    fullWidth
                    variant="outlined"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    input={<OutlinedInput label="Gender" />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
                      },
                      backgroundColor: theme.palette.grayish.main,
                    }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    {/* Add more gender options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="age"
                    type="number"
                    autoComplete="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    name="date_of_birth"
                    type="date"
                    autoComplete="bday"
                    placeholder="Date of Birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                    name="referral_code"
                    type="text"
                    autoComplete="off"
                    placeholder="Referral Code (optional)"
                    value={formData.referral_code}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        backgroundColor: theme.palette.grayish.main,
                        "&:focus": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "3rem",
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 14px",
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
                          style={{ fontSize: "10px" }}
                          checked={isAgreed}
                          onChange={handleCheckboxChange}
                          name="agreement"
                          sx={{
                            color: theme.palette.primary.main,
                            "& .Mui-checked": {
                              color: "#ff2557",
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
                    marginTop: "0.5rem",
                    borderRadius: "50px",
                    backgroundColor: isAgreed
                      ? theme.palette.primary.main
                      : theme.palette.primary.light,
                    color: "white",
                    "&:hover": {
                      backgroundColor: isAgreed
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                    },
                    height: "2.75rem",
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
                    marginTop: "0.25rem",
                    borderRadius: "50px",
                    height: "2.75rem",
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
                  Already have an account?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#ff2557",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div className="container" style={{ marginTop: "1rem" }}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Link href="#" color="inherit">
                        <Typography variant="body2">About the App</Typography>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" color="inherit">
                        <Typography variant="body2">
                          Terms and Conditions
                        </Typography>
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
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
