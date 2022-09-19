import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Avatar,
  Button,
  Modal
} from '@mui/material';
import PropTypes from 'prop-types';
// Dropdown Component
import ProfileDropdown from './ProfileDropdown';

// Image
import profileImg from '../../../assets/images/users/profile.png';

// Redux Actions
import { setConnect } from '../../../redux/customizer/Action';

// Server 
import { getUser } from "../../../server/users";

// Web 3 
import { useWeb3React } from "@web3-react/core";
import { useInactiveListener, useEagerConnect } from "../../../web3/hooks";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const navigate = useNavigate();

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

  /* ******************************************************** */
  // Testnet switch
  /* ******************************************************** */

  const switchNetwork = async () => {
    try {
      await web3React.library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (switchError) {
      console.error(switchError);
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await web3React.library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: '0x13881', // 8001,
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                chainName: "Polygon Testnet",
                nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              }
            ],
          });
        } catch (error) {
          console.error(error)
        }
      }
    }
  };

  /* ******************************************************** */
  // End Testnet switch
  /* ******************************************************** */


  const dispatch = useDispatch();

  const [currentAccount, setCurretnAccount] = useState(sessionStorage.getItem('adr'));
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Change Network for Testnet 
    if (web3React.chainId !== 80001) {
      switchNetwork();
    }

    // Check if wallet is connected
    if (currentAccount === null) {
      setCurretnAccount(web3React.account);
      getUser(web3React.account).then(res => {
        setCurrentUser(res);
        if (res.profilePic && res.profilePic !== null) {
          setProfilePic(res.profilePic);
        }
      });
    }
    if (currentAccount !== null) {
      getUser(currentAccount).then(res => {
        setCurrentUser(res);
        if (res.profilePic && res.profilePic !== null) {
          setProfilePic(res.profilePic);
        }
      });
    }

  }, [web3React.account]);

  async function disconnect(e) {
    web3React.deactivate();
    dispatch(setConnect(false))
    sessionStorage.removeItem('adr');
    navigate('/');
    e.preventDefault();
  }

  // 4
  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  return (
    <AppBar sx={sx} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          size="large"
          sx={{
            display: {
              lg: 'flex',
              xs: 'none',
            },
          }}
        >
          <FeatherIcon icon="menu" />
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={profilePic !== null ? profilePic : profileImg}
              alt={profilePic !== null ? profilePic : profileImg}
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  ml: 1,
                }}
              >
                {currentUser ? currentUser.username ? `${currentUser.username}` : `${currentAccount[0]}${currentAccount[1]}${currentAccount[2]}${currentAccount[3]}${currentAccount[4]} ... ${currentAccount[38]}${currentAccount[39]}${currentAccount[40]}${currentAccount[41]}` : null}
              </Typography>
              <FeatherIcon icon="chevron-down" width="20" height="20" />
            </Box>
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          sx={{
            '& .MuiMenu-paper': {
              width: '385px',
              right: 0,
              top: '70px !important',
            },
            '& .MuiList-padding': {
              p: '30px',
            },
          }}
        >
          {currentUser ? profilePic !== null ? <ProfileDropdown username={currentUser.username} address={currentAccount} profilePic={profilePic} /> : <ProfileDropdown username={currentUser.username} address={currentAccount} profilePic={null} /> : <ProfileDropdown username={false} address={currentAccount} profilePic={null} />}
          <Button
            onClick={(e) => disconnect(e)}
            sx={{
              mt: 2,
              display: 'block',
              width: '100%',
            }}
            variant="contained"
            color="primary"
          >
            Disconnect
          </Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
