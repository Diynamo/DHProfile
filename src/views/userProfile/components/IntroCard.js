import React from 'react';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';

import SocialButton from './SocialButton';

const IntroCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        {user ? user.social ? user.bio ?
          (
            <>
              <Typography fontWeight="500" variant="h3" textAlign="center">
                Introduction
              </Typography>
              <Typography
                textAlign="center"
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{
                  mt: '17px',
                }}
              >
                {user.bio}
              </Typography>
            </>
          )
          : null
          : user.bio ?
            (
              <>
                <Typography fontWeight="500" variant="h3" textAlign="center">
                  Introduction
                </Typography>
                <Typography
                  textAlign="center"
                  color="textSecondary"
                  variant="h5"
                  fontWeight="400"
                  sx={{
                    mt: '17px',
                  }}
                >
                  {user.bio}
                </Typography>
              </>
            )
            : <>
              <Typography fontWeight="500" variant="h3" textAlign="center">
                No details to display
              </Typography>
            </>
          :
          <>
            <Typography fontWeight="500" variant="h3" textAlign="center">
              No details to display
            </Typography>
          </>
        }
        {user ? user.social ?
          <Grid container mt={4} justifyContent="center">
            <Grid item xs={12} md={6} mx={{ xs: "auto", sm: 6, md: 1 }}>
              {Object.keys(user.social).map(key => {
                return (
                <SocialButton key={key} social={user.social[key]} type={key}/>
                )
              })}
            </Grid>
          </Grid>
          : null : null}
      </CardContent>
    </Card >
  );
};

export default IntroCard;
