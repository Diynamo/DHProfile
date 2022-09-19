import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CollectionDesc = ({ desc }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card
      sx={{
        p: {
          xs: '20px',
          sm: '35px',
          lg: '35px',
        },
      }}
    >
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="white"
              allowScrollButtonsMobile
              scrollButtons
              indicatorColor="secondary"
            >
              {desc.map((item, index) => (
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  label={item.label}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {desc.map((item, index) => (
            <TabPanel value={value} index={index} component="div">
              <Typography
                fontWeight="500"
                sx={{
                  fontSize: {
                    xs: '16px',
                    sm: '24px',
                    lg: '24px',
                  },
                }}
              >
                {item.title}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                fontWeight="400"
                sx={{
                  mt: 4,
                }}
              >
                {item.desc}
              </Typography>
            </TabPanel>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionDesc;
