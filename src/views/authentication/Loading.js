import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

const Error = () => (
  <PageContainer title="Loading" description="this is Load page">
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
          Loading ...
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
          We are uploading your content
        </Typography>
      </Container>
    </Box>
  </PageContainer>
);

export default Error;
