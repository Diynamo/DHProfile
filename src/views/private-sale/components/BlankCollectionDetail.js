import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Chip,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import CustomSelect from '../../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

// Image
import Metamask from "../../../assets/images/wallet/metamask.svg";
import WalletConnect from "../../../assets/images/wallet/walletconnect.svg";

import { setConnect } from '../../../redux/customizer/Action';

// Web 3
import {
  injected,
  walletconnect,
} from '../../../web3/connectors';
import {
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

import { checkUser, addFirst, updateLogin } from '../../../server/users';



function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }
  if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  }
  console.error(error);
  return "An unknown error occurred. Check the console for more details.";
}

const CollectionDetail = ({ title, maxQty, desc, online, price }) => {

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
  
    // START CONNECT TO WEB 3.0
    const web3React = useWeb3React();
  
    async function connectMetamask() {
      try {
        await web3React.activate(injected);
        const { provider } = await injected.activate();
        if (provider) {
          try {
            await checkUser(provider.selectedAddress).then(res => {
              if (!res) {
                const newUser = {
                  id: provider.selectedAddress,
                }
                addFirst(newUser).then(response => {
                  if (response) {
                    dispatch(setConnect(true));
                    sessionStorage.setItem('adr', provider.selectedAddress)
                  }
                });
              }
            });
            await updateLogin(provider.selectedAddress)
            dispatch(setConnect(true))
            sessionStorage.setItem('adr', provider.selectedAddress)
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    async function connectWalletConnect() {
      try {
        await web3React.activate(walletconnect);
        const { provider } = await walletconnect.activate();
        if (provider) {
          try {
            await checkUser(provider.accounts[0]).then(res => {
              if (!res) {
                const newUser = {
                  id: provider.accounts[0],
                }
                addFirst(newUser).then(response => {
                  if (response) {
                    dispatch(setConnect(true));
                    sessionStorage.setItem('adr', provider.accounts[0])
                  }
                });
              }
            });
            await updateLogin(provider.accounts[0])
            dispatch(setConnect(true))
            sessionStorage.setItem('adr', provider.accounts[0])
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

  const [qtyArr, setQtyArr] = React.useState([]);

  React.useEffect(() => {
    const arrQty = [];
    for (let i = 1; i <= maxQty; i++) {
      arrQty.push(i);
    }
    setQtyArr(arrQty);
  }, [])

  //   Qty
  const [qty, setQty] = React.useState('1');

  const handleChange3 = (event3) => {
    setQty(event3.target.value);
  };

  const QtyMenuItem = () => {
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
    <Box>
      {/* stock text */}
      <Box display="flex" alignItems="center">
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
        online ?
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
                        {maxQty ?
                          <QtyMenuItem />
                          :
                          <CustomSelect
                            labelId="qty-label"
                            id="qty-select-outlined"
                            value={qty}
                            onChange={handleChange3}
                            fullWidth
                            size="small"
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                          </CustomSelect>
                        }
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
              <Grid item xs={12} justifyContent="center" textAlign="center">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{
                    pt: '13px',
                    pb: '13px',
                    mb: '10px',
                    display: 'block',
                    width: '100%',
                    borderRadius: '9px',
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Please Connect Wallet
                </Button>
                <Collapse in={open} sx={{width:"fit-content",margin:"auto"}}>
                  <Alert
                    variant="string"
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <FeatherIcon icon="x" width="20" />
                      </IconButton>
                    }
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography fontWeight="700" variant="body2" mb>
                          Chose your connector
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Button
                          variant="outlined"
                          size="large"
                          display="flex"
                          alignitems="center"
                          justifycontent="center"
                          sx={{
                            width: '100%',
                            borderColor: (theme) =>
                              `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                            borderWidth: '2px',
                            textAlign: 'center',
                            mt: 2,
                            pt: '10px',
                            pb: '10px',
                            '&:hover': {
                              borderColor: (theme) =>
                                `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                              borderWidth: '2px',
                            },
                          }}
                          onClick={() => {
                            connectMetamask();
                          }}
                        >
                          <Box display="flex" alignItems="center">
                            <img src={Metamask} alt="metamask" width="40" />
                            <Typography
                              variant="h6"
                              sx={{
                                ml: 1,
                                color: (theme) =>
                                  `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                  }`,
                              }}
                            >
                              Metamask
                            </Typography>
                          </Box>
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Button
                          variant="outlined"
                          size="large"
                          display="flex"
                          alignitems="center"
                          justifycontent="center"
                          sx={{
                            width: '100%',
                            borderColor: (theme) =>
                              `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                            borderWidth: '2px',
                            textAlign: 'center',
                            mt: 2,
                            pt: '10px',
                            pb: '10px',
                            '&:hover': {
                              borderColor: (theme) =>
                                `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                              borderWidth: '2px',
                            },
                          }}
                          onClick={() => {
                            connectWalletConnect();
                          }}
                        >
                          <Box display="flex" alignItems="center">
                            <img src={WalletConnect} alt="walletconnect" width="40" />
                            <Typography
                              variant="h6"
                              sx={{
                                ml: 1,
                                color: (theme) =>
                                  `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                  }`,
                              }}
                            >
                              WalletConnect
                            </Typography>
                          </Box>
                        </Button>
                      </Grid>
                    </Grid>
                    {!!web3React.error && (
                      <Grid item xs={12}>
                        <Typography fontWeight="700" variant="body2">
                          {getErrorMessage(web3React.error)}
                        </Typography>
                      </Grid>
                    )}
                  </Alert>
                </Collapse>
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
          : null
      }
    </Box >
  );
};

CollectionDetail.propTypes = {
  title: PropTypes.string.isRequired,
  maxQty: PropTypes.number,
  desc: PropTypes.string.isRequired,
  online: PropTypes.bool,
  price: PropTypes.number.isRequired,
};

export default CollectionDetail;
