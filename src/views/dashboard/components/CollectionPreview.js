import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Grid
} from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const CollectionPreview = ({ imgCover, title, desc, online, launchDate, urlCollection }) => (
  <Card
    sx={{
      p: 0,
      width: '100%',
    }}
  >
    <img srcSet={imgCover} alt="img" width="100%" />
    <CardContent
      sx={{
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
    >
      <Box display="flex" alignItems="center">
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              alignItems="center"
              display="flex"
            >
              <FeatherIcon icon="clock" width="20" height="20"/>{launchDate}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="center">
            {
              online ?
                <Chip
                  label="Online"
                  color="success"
                  sx={{
                    borderRadius: '6px',
                    pl: '8px',
                    pr: '8px',
                    pt: '3px',
                    pb: '3px',
                    color: '#fff',
                    height: 'unset',
                    mr: '10px',
                    '& .MuiChip-label': {
                      pl: 0,
                      pr: 0,
                    },
                  }}
                />
                :
                <Chip
                  label="Coming soon"
                  color="warning"
                  sx={{
                    borderRadius: '6px',
                    pl: '8px',
                    pr: '8px',
                    pt: '3px',
                    pb: '3px',
                    color: '#fff',
                    height: 'unset',
                    mr: '10px',
                    '& .MuiChip-label': {
                      pl: 0,
                      pr: 0,
                    },
                  }}
                />
            }
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="h4"
        sx={{
          mt: 4,
          pt: 1,
        }}
      >
        {title}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 2,
          pb: 3,
        }}
      >
        <Typography variant="subtitle2">
          {desc}
        </Typography>
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: 3,
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
          }}
          to={urlCollection}
        >
          <Button variant="contained" color="primary">
            Discover the Collection
          </Button>
        </Link>
      </Box>
    </CardContent>
  </Card>
);

CollectionPreview.propTypes = {
  imgCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
  launchDate: PropTypes.string.isRequired,
  urlCollection: PropTypes.string.isRequired,
};

export default CollectionPreview;
