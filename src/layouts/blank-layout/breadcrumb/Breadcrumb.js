import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
// Dropdown Component
import LoginDropdown from './LoginDropdown';
import LogoIcon from '../../full-layout/logo/LogoIcon';

const Breadcrumb = ({ customClass }) => {

  const customizer = useSelector((state) => state.CustomizerReducer);

  // 4
  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  return (
    <AppBar sx={{
      backgroundColor: customizer.activeMode === 'dark' ? '#20232a' : '#fafbfb'
    }} elevation={0} className={customClass}
    >
      <Toolbar sx={{justifyContent:"space-between!important"}}>
        <Box textAlign="left" mb={2} mt={2}>
          <LogoIcon />
        </Box>
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
          variant="contained"
          color="primary"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          Connect
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
          <LoginDropdown />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Breadcrumb.propTypes = {
  customClass: PropTypes.string,
};

export default Breadcrumb;
