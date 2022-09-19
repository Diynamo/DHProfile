import React from 'react';
import { Card, Typography, Box } from '@mui/material';

import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'DAO',
  },
  {
    title: 'Cristiano',
  },
];

const CristianoDao = () => {
  return (
    <PageContainer title="Cristiano DAO" description="This is the Christian DAO dashboard">
      {/* breadcrumb */}
      <Breadcrumb title="Cristiano DAO" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <Box p={10}>
          <Typography variant="h1" textAlign="center">Coming Soon</Typography>
        </Box>
      </Card>
    </PageContainer>
  );
};

export default CristianoDao;
