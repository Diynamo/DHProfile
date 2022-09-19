import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  Chip,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Modal,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CustomSelect from '../../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';
import { swappyPay, StripePayment, calculateOrderAmount } from '../../../server/payment';

import { getBalance, getTotalLeft } from '../../../web3/cristianoWhitelist';

// Web3
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from '../../../web3/hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
};

const CollectionDetail = ({ title, maxQty, desc, online, price }) => {

  const [soldOut, setSoldOut] = useState(false);

  const [sessionAdr, setSessionAdr] = useState(sessionStorage.getItem('adr'));
  const [maxQtyUser, setMaxQtyUser] = useState(0);
  const [qtyArr, setQtyArr] = useState(null);

  // START CONNECT TO WEB 3.0

  const web3React = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === web3React.connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, web3React.connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // END CONNECT TO WEB 3.0

  useEffect(() => {

    getTotalLeft().then(n => {
      if (n.toNumber() === 0) {
        setSoldOut(true);
      }
    });

    if (web3React.active) {
      setSessionAdr(web3React.account);
      getBalance(web3React.account).then(res => {

        setMaxQtyUser(res.qty_bought.toNumber());

        switch (res.qty_bought.toNumber()) {
          case 0:
            setQtyArr([1, 3, 5, 10]);
            break;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            setQtyArr([1, 3, 5]);
            break;
          case 6:
          case 7:
            setQtyArr([1, 3]);
            break;
          case 8:
          case 9:
            setQtyArr([1]);
            break;
          default:
            setQtyArr(null);
        }
      });

    } else {
      getBalance(sessionAdr).then(res => {

        setMaxQtyUser(res.qty_bought.toNumber());

        switch (res.qty_bought.toNumber()) {
          case 0:
            setQtyArr([1, 3, 5, 10]);
            break;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            setQtyArr([1, 3, 5]);
            break;
          case 6:
          case 7:
            setQtyArr([1, 3]);
            break;
          case 8:
          case 9:
            setQtyArr([1]);
            break;
          default:
            setQtyArr(null);
        }
      });
    }

  }, [web3React.active]);

  //   Qty
  const [qty, setQty] = useState('1');

  const handleChange3 = (event3) => {
    setQty(event3.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = useState(false);

  const QtyMenuItem = () => {
    if (qtyArr !== null) {
      const listeItem = qtyArr.map((number) =>
        <MenuItem key={number.toString()} value={number}>{number}</MenuItem>
      );
      return (
        <CustomSelect
          labelId="qty-label"
          id="qty-select-outlined"
          value={qty}
          onChange={handleChange3}
          fullWidth
          size="small"
        >
          {listeItem}
        </CustomSelect>
      );
    }
    return (
      <CustomSelect
        labelId="qty-label"
        id="qty-select-outlined"
        value={qty}
        onChange={handleChange3}
        fullWidth
        size="small"
      >
        <MenuItem value={1}>Max 10 NFT for wallet</MenuItem>
      </CustomSelect>
    );
  };

  return (
    <Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign="center">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2">
              Pay using Stripe
            </Typography>

            <Typography variant="body2" mt={2}>
              Total: 3$ x {qty} NFT + (Stripe Fee) = {calculateOrderAmount(qty)}$
            </Typography>
          </Box>
          <StripePayment desc='DH Cristiano Presale' qty={qty} address={sessionAdr} />
        </Box>
      </Modal>

      {/* stock text */}
      <Box display="flex" alignItems="center">
        {
          online && !soldOut ?
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
            : soldOut ?
              <Chip
                label="Sold Out"
                color="error"
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
      </Box>
      {/* title */}
      <Typography
        fontWeight="600"
        sx={{
          fontSize: {
            xs: '24px',
            sm: '30px',
            lg: '30px',
          },
          mt: '5px',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="400"
        sx={{
          mt: '10px',
          color: (theme) => theme.palette.grey.A200,
        }}
      >
        {desc}
      </Typography>
      {
        online && !soldOut ?
          <>
            <Typography
              fontWeight="600"
              sx={{
                fontSize: {
                  xs: '24px',
                  sm: '30px',
                  lg: '30px',
                },
                mt: '20px',
                mb: '20px',
              }}
            >
              ${price}
            </Typography>
            {/* Quantity */}
            <Divider />
            <Box
              sx={{
                pt: 3,
                pb: 3,
                mt: 1,
                mb: 1,
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <CustomFormLabel
                      htmlFor="qty-select-outlined"
                      sx={{
                        mt: 0,
                      }}
                    >
                      Qty.
                    </CustomFormLabel>
                    <Box
                      sx={{
                        ml: 2,
                        width: '100%',
                      }}
                    >
                      <FormControl variant="outlined" fullWidth>
                        <QtyMenuItem />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
              }}
            >

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox
                    onClick={() => setChecked(!checked)}
                  />}
                  label={<>
                    Accept the <a href="/dream/cristiano/terms-and-condition" style={{ color: "#216bd6" }}>Terms & Conditions of the Cristiano collection</a>
                  </>}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                {
                  maxQtyUser >= 10 || !checked ?
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled
                      sx={{
                        pt: '13px',
                        pb: '13px',
                        display: 'block',
                        width: '100%',
                        borderRadius: '9px',
                      }}
                    >
                      Buy Now in Crypto
                    </Button>
                    :
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      sx={{
                        pt: '13px',
                        pb: '13px',
                        display: 'block',
                        width: '100%',
                        borderRadius: '9px',
                      }}
                      onClick={() => swappyPay(price, qty)}
                    >
                      Buy Now in Crypto
                    </Button>
                }
              </Grid>

              <Grid item xs={12} md={6}>
                {
                  maxQtyUser >= 10 || !checked ?
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled
                      sx={{
                        pt: '13px',
                        pb: '13px',
                        display: 'block',
                        width: '100%',
                        borderRadius: '9px',
                      }}
                    >
                      Buy Now in FIAT
                    </Button>
                    :
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => handleOpen()}
                      sx={{
                        pt: '13px',
                        pb: '13px',
                        display: 'block',
                        width: '100%',
                        borderRadius: '9px',
                      }}
                    >
                      Buy Now in FIAT
                    </Button>
                }
              </Grid>

            </Grid>
            <Typography
              variant="body2"
              sx={{
                mt: '25px',
                color: (theme) => theme.palette.grey.A200,
              }}
            >
              * Merchant commission charges will apply to the transaction.
            </Typography>
          </>
          : soldOut ?
            <>
              <Typography
                fontWeight="600"
                sx={{
                  fontSize: {
                    xs: '24px',
                    sm: '30px',
                    lg: '30px',
                  },
                  mt: '20px',
                  mb: '20px',
                }}
              >
                ${price}
              </Typography>
              {/* Quantity */}
              <Divider />
              <Box
                sx={{
                  pt: 3,
                  pb: 3,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} textAlign='center'>

                    <Typography
                      fontWeight="600"
                      variant='h4'
                    >
                      The dream has been validated 🎉
                    </Typography>

                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                }}
              >

                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled
                    sx={{
                      pt: '13px',
                      pb: '13px',
                      display: 'block',
                      width: '100%',
                      borderRadius: '9px',
                    }}
                  >
                    Buy Now in Crypto
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled
                    sx={{
                      pt: '13px',
                      pb: '13px',
                      display: 'block',
                      width: '100%',
                      borderRadius: '9px',
                    }}
                  >
                    Buy Now in FIAT
                  </Button>
                </Grid>

              </Grid>
            </>
            :
            null
      }
    </Box >
  );
};

CollectionDetail.propTypes = {
  title: PropTypes.string.isRequired,
  maxQty: PropTypes.number,
  desc: PropTypes.any.isRequired,
  online: PropTypes.bool,
  price: PropTypes.number.isRequired,
};

export default CollectionDetail;
