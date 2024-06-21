import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Link, CssBaseline } from '@mui/material';
import logo from '../../Assets/locaidad.png';

const Countdown= ({days}) => {
  const secondsInADay = 86400; // 24 hours * 60 minutes * 60 seconds
  const totalSeconds = days * secondsInADay;

  const [count, setCount] = useState(totalSeconds);

  useEffect(() => {
    const countInterval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(countInterval);
      }
    }, 1000);

    return () => clearInterval(countInterval);
  }, [count]);

  const dayRem = Math.floor(count / secondsInADay);
  const hrRem = Math.floor((count % secondsInADay) / 3600);
  const minRem = Math.floor((count % 3600) / 60);
  const secRem = count % 60;


  return (
    <div style={{ backgroundColor: '#ff2557', color:'#fff', minHeight: '100vh' }}>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div className='logo_div'>
            <img className='logo' src={logo} alt='locaidad' style={{ maxWidth: '30%', height: 'auto' }} />
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="h6" gutterBottom>Desktop App Launch Date</Typography>
            <Typography variant="h3" gutterBottom>{dayRem} DAYS</Typography>
            <Typography variant="h4">{`${hrRem}:${minRem}:${secRem}`}</Typography>
          </div>
          <div className='container' style={{ marginTop: '2rem' }}>
            <Grid container spacing={3} justifyContent="center">
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
    </div>
  );
};

export default Countdown;
