import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import CookieConsent from "react-cookie-consent";

const Footer = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <Typography>© 2022 All rights reserved by Dream Hunters </Typography>
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="DreamHuntersCookie"
      style={{ background: "rgb(40, 44, 52)" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: "5px" }}
      expires={150}
    >
      This website uses <Link to="/cookie-policy">cookies</Link> to enhance the user experience.
    </CookieConsent>
  </Box>
);

export default Footer;
