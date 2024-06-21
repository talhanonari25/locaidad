import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid, Link, Box} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

const Home = ({days}) => {
    const navigate = useNavigate();
    const secondsInADay = 86400;
    const totalSeconds = days * secondsInADay;
    const [countdown, setCountdown] = useState(totalSeconds);

    useEffect(() => {
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
      return () => clearInterval(countdownInterval);
    }, [countdown]);

    const dayRem = Math.floor(countdown / secondsInADay);
    const hrRem = Math.floor((countdown % secondsInADay) / 3600);
    const minRem = Math.floor((countdown % 3600) / 60);
    const secRem = countdown % 60;
  
    return (
        <Container maxWidth="md" style={{ minHeight: '85vh' }}>
          <Box style={{width: '100%', maxWidth: '500px', textAlign: 'left', marginTop: '1rem' }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>Join the Countdown.</Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Sign up and Be the First to Explore Locaided on the Web and the App Stores!</Typography>
              <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px'}}/>
              Connect Differently, Discover Deeply.
              </Typography>
                <span>Experience the power of a hyper-local social network with Locaided.</span>
                <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px'}}/>
              Fake News Ends Here!
              </Typography>
                <span>If it's Locaided, it's Real.</span>
                <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleRoundedIcon style={{ color: '#ff2557', marginRight: '8px'}}/>
              Community-Powered Content Moderation
              </Typography>
                <span>Community Votes Determine Content Visibility Together, we shope a trustworthy space.</span>
                <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedRoundedIcon style={{ color: '#0096FF', marginRight: '8px'}}/>
              Free Premium Month
              </Typography>
                <span>Act fast! Sign up before the countdown hits zero and secure a free premium month!</span>
                <Box m={2}>
                    <Button variant="contained"
                        style={{ borderRadius: '50px', backgroundColor: "#ff2557", color: 'white', height: '2.5rem', width:'50%' }}
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
        </Container>
    );
}

export default Home;