import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';
import { FaBitcoin } from 'react-icons/fa';

const BtcPrice = () => {

  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD')
      .then(res => res.json())
      .then(data => {
        setPrice(data.bitcoin.usd);
      })
  }, []);

  return (
    <Card>
      <CardContent sx={{ minHeight: "190px" }}>
        <Box display="flex" alignItems="flex-start">
          <Typography
            variant="h4"
            sx={{
              marginBottom: '0',
            }}
            gutterBottom
          >
            Bitcoin
          </Typography>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Fab
              size="small"
              color="info"
              elevation="0"
              sx={{backgroundColor: '#f7931a'}}
            >
              <FaBitcoin />
            </Fab>
          </Box>
        </Box>
        <Typography
          variant="h1"
          fontWeight="500"
          sx={{
            marginBottom: '0',
            marginTop: '30px',
          }}
          gutterBottom
        >
          $ {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BtcPrice;
