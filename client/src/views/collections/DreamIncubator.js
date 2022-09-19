import React from 'react';
import { Box, Grid, Card, Typography, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import CollectionItems from './data';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dream Incubator',
  },
];
const DreamIncubator = () => (
  <PageContainer title="Dream incubator" description="This is Dream incubator if Dream Hunters">
    {/* breadcrumb */}
    <Breadcrumb title="Dream Incubator" items={BCrumb} />

    <Grid container spacing={0}>
      {CollectionItems.map((dream) => (
        <Grid item xs={12} lg={3} sm={4} display="flex" alignItems="stretch" key={dream.id}>
          <Card sx={{ p: 0, width: '100%' }}>
            <img src={dream.photo} alt="img" width="100%" />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption">{dream.category}</Typography>
              <Typography
                component={Link}
                to="/shop/shop-detail"
                fontWeight="500"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  color: (theme) =>
                    `${theme.palette.mode === 'dark'
                      ? theme.palette.grey.A200
                      : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                {dream.title}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  mt: '15px',
                }}
              >
                <Button
                  component="a"
                  href={dream.link}
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    pt: '10px',
                    pb: '10px',
                    mb: '20px',
                  }}
                >
                  Visit Dream Detail 👀
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </PageContainer>
);

export default DreamIncubator;
