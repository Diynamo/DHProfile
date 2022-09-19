import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';
import { FaEthereum } from 'react-icons/fa';

const EthPrice = () => {

  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD')
      .then(res => res.json())
      .then(data => {
        setPrice(data.ethereum.usd);
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
            Ethereum
          </Typography>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Fab
              size="small"
              color="secondary"
              elevation="0"
              sx={{backgroundColor: '#48cbd9'}}
            >
              <FaEthereum color="black" />
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
}

export default EthPrice;
