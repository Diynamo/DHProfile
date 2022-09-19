import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';

const Error = () => (
  <PageContainer title="Error" description="this is Error page">
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
      sx={{ backgroundColor: '#6667AB' }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          variant="h1"
          sx={{
            pt: 2,
            color: 'white'
          }}
        >
          404
        </Typography>
        <Typography
          align="center"
          variant="h4"
          sx={{
            pt: 1,
            pb: 3,
            color: 'white'
          }}
        >
          This page could not be found.
        </Typography>
        <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
          Back to Home
        </Button>
      </Container>
    </Box>
  </PageContainer>
);

export default Error;
