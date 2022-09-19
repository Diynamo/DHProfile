import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Box, Typography, Button, IconButton, Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import FeatherIcon from 'feather-icons-react';
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

import PageContainer from '../../components/container/PageContainer';
import Footer from '../../layouts/full-layout/footer/Footer';

// Image 
import Metamask from "../../assets/images/wallet/metamask.svg";
import WalletConnect from "../../assets/images/wallet/walletconnect.svg";

import { setConnect } from '../../redux/customizer/Action';

// Web 3 
import {
  injected,
  walletconnect,
} from "../../web3/connectors";
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

import { checkUser, addFirst, updateLogin } from '../../server/users';
import LogoIcon from '../../layouts/full-layout/logo/LogoIcon';

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

const Connect = () => {
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

  return (
    <PageContainer title="Dream Hunters | Login" description="Login to Dream Hunters App">
      <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center' }}>
        <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9}>
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <LogoIcon />

                <Typography fontWeight="700" variant="h2">
                  Welcome to Dream Hunters App
                </Typography>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => {
                      setOpen(true);
                    }}
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mb: '10px',
                    }}
                  >
                    Connect Wallet
                  </Button>
                  <Collapse in={open}>
                    <Alert
                      variant="outlined"
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
                            variant="text"
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
                            variant="text"
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
                  <Box
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                      mt: '20px',
                      mb: '20px',
                      '&::before': {
                        content: '""',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#42464d' : '#ecf0f2'}`,
                        height: '1px',
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '13px',
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        position: 'relative',
                        padding: '0 12px',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#282c34' : '#fff'}`,
                      }}
                    >
                      Contact Us
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Button
                        component="a"
                        target="_blank"
                        href="https://discord.gg/QygMAVFxfd"
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
                      >
                        <Box display="flex" alignItems="center">
                          <FaDiscord
                            sx={{
                              color: (theme) => theme.palette.secondary.main,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              color: (theme) =>
                                `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                }`,
                            }}
                          >
                            Discord
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Button
                        component="a"
                        target="_blank"
                        href="https://www.twitter.com/dreamhuntersnft/"
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
                      >
                        <Box display="flex" alignItems="center">
                          <FaTwitter
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              color: (theme) =>
                                `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                }`,
                            }}
                          >
                            Twitter
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Button
                        component="a"
                        target="_blank"
                        href="https://www.instagram.com/dreamhuntersnft/"
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
                      >
                        <Box display="flex" alignItems="center">
                          <FaInstagram
                            sx={{
                              color: (theme) => theme.palette.secondary.main,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              color: (theme) =>
                                `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                }`,
                            }}
                          >
                            Instagram
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Button
                        component="a"
                        target="_blank"
                        href="https://www.linkedin.com/company/dreamhuntersnft/"
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
                      >
                        <Box display="flex" alignItems="center">
                          <FaLinkedin
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              color: (theme) =>
                                `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                }`,
                            }}
                          >
                            Linkedin
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </PageContainer>
  );
};

export default Connect;
