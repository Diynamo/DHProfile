import React from 'react';
import { Card, Typography, Box, Link } from '@mui/material';

import Breadcrumb from '../../layouts/blank-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import Footer from '../../layouts/full-layout/footer/Footer';


const Cookie = () => {
  return (
    <PageContainer title="Dream Hunters | Cookie policy" description="This is Cookie policy of Dream Hunters">
      {/* breadcrumb */}
      <Breadcrumb />
      {/* end breadcrumb */}
      <Card sx={{ mt: 12 }}>
        <Box>
          <Typography variant="h1">Cookie policy</Typography>

          <Typography variant="body1" color="textSecondary">
            Cookie Policy is an integral part of the Privacy Policy available here: <Link to="/privacy-policy" sx={{ color: (theme) => theme.palette.primary.main }}>Privacy Policy</Link>
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box>
          <Typography variant="h3">What are cookies</Typography>

          <Typography variant="body1" color="textSecondary">
            Cookies are small text strings that are saved in the browser or device memory when you visit a site or view a message. Cookies allow a site to recognize a particular device or browser.
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box>
          <Typography variant="h3">Technical cookies</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            Useful to ensure the operation of our services, allow us to improve performance by allowing our sites, services, applications and tools to store important information in your browser or device in order to use them later to identify you on our servers or internal systems.
          </Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            The consent for the use of these cookies is not mandatory. If you do not want to accept the use of technical cookies you can disable them as indicated. In this case you may not be able to use certain functions and / or services.
          </Typography>

          <Typography variant="body1" color="textSecondary">
            The websites can use, also in combination with each other, the technical cookies of third parties.
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box>
          <Typography variant="h3">Our cookies</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            Our cookies are saved only after you have given your consent, using the appropriate banner that appears when accessing the website.
          </Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            The use of technical cookies is limited to the transmission of session identifiers necessary for the safe and efficient exploration of the sites and the application and for the collection of data in aggregate form, in order to elaborate anonymous statistical information on the use of the platform , to improve the use of services rendered to the User.
          </Typography>

          <Typography variant="body1" color="textSecondary">
            The website uses third-party cookies and incorporates traffic measurement systems.
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box>
          <Typography variant="h3">Disabling Cookies</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            The User can set preferences on the use of cookies (authorizing installation, as well as blocking or deleting cookies already in use, in whole or in part). It’s possible to modify the settings of your browser in order to disable cookies, from the following browsers:
          </Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            Internet Explorer: http://windows.microsoft.com/it-it/windows7/block-enable-or-allow-cookies <br />
            Safari: http://support.apple.com/kb/PH11913 <br />
            Chrome: https://support.google.com/chrome/answer/95647?hl=it-IT&hlrm=fr&hlrm=en <br />
            Firefox: https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie <br />
            Opera: http://help.opera.com/Windows/10.00/it/cookies.html <br />
          </Typography>

          <Typography variant="body1" color="textSecondary">
            It should be noted, however, that the disabling, even partial, of cookies could compromise the operation of the site and / or limit its functionality.
          </Typography>
        </Box>
      </Card>
      <Footer />
    </PageContainer>
  );
};

export default Cookie;
