import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid, Link, Box, ImageListItem, useMediaQuery } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import logo from '../../Assets/locaided Logo.png';

const Home = ({days}) => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(days * 86400);
  
    useEffect(() => {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }, []);
  
    const dayRem = Math.floor(countdown / 86400);
    const hrRem = Math.floor((countdown % 86400) / 3600);
    const minRem = Math.floor((countdown % 3600) / 60);
    const secRem = countdown % 60;
  
    const small_screen = useMediaQuery('(max-width:720px)');
  
    return (
      <Container maxWidth="md" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box style={{ display: 'flex', flexDirection: small_screen ? 'column' : 'row', alignItems: 'center', width: '100%' }}>
          <Box style={{ flex: 1, textAlign: 'center', marginBottom: small_screen ? '20px' : '0' }}>
            <ImageListItem>
              <img src={logo} alt="Locaided Logo" style={{ width: '100%', maxWidth: small_screen ? '150px' : '440px', height: 'auto' }} />
            </ImageListItem>
          </Box>
          <Box style={{ flex: 1, textAlign: 'left', padding: small_screen ? '16px' : '0' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Join the Countdown.</Typography>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Sign up and Be the First to Explore Locaided on the Web and the App Stores!</Typography>
            <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px' }} />
              Connect Differently, Discover Deeply.
            </Typography>
            <span>Experience the power of a hyper-local social network with Locaided.</span>
            <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px' }} />
              Fake News Ends Here!
            </Typography>
            <span>If it's Locaided, it's Real.</span>
            <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px' }} />
              Community-Powered Content Moderation
            </Typography>
            <span>Community Votes Determine Content Visibility Together, we shape a trustworthy space.</span>
            <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedRoundedIcon style={{ color: '#0096FF', marginRight: '8px' }} />
              Free Premium Month
            </Typography>
            <span>Act fast! Sign up before the countdown hits zero and secure a free premium month!</span>
            <Box m={2}>
              <Button
                variant="contained"
                style={{ borderRadius: '50px', backgroundColor: "#fff", color: 'black', height: '2.5rem', width: small_screen ? '100%' : '70%' }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>{dayRem} DAYS - {`${hrRem}:${minRem}:${secRem}`}</Typography>
            <Grid container spacing={3} justifyContent="left">
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
          </Box>
        </Box>
      </Container>
    );
  }

export default Home;