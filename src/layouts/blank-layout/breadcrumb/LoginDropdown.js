import React from 'react';
import { Box, MenuItem, Typography, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import Metamask from '../../../assets/images/wallet/metamask.svg';
import WalletConnect from '../../../assets/images/wallet/walletconnect.svg';

import { setConnect } from '../../../redux/customizer/Action';

// Web 3 
import { injected, walletconnect } from '../../../web3/connectors';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
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

const LoginDropdown = () => {

  const dispatch = useDispatch();

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
    <Box>
      <MenuItem>
        <Grid container spacing={0}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
          {!!web3React.error && (
            <Grid item xs={12}>
              <Typography fontWeight="700" variant="body2">
                {getErrorMessage(web3React.error)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </MenuItem>
    </Box>
  );
};

export default LoginDropdown;
