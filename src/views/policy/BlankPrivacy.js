import React from 'react';
import { Card, Typography, Box, Link } from '@mui/material';

import Breadcrumb from '../../layouts/blank-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import Footer from '../../layouts/full-layout/footer/Footer';


const Privacy = () => {
  return (
    <PageContainer title="Dream Hunters | Privacy Policy" description="Privacy Policy of Dream Hunters">
      {/* breadcrumb */}
      <Breadcrumb />
      {/* end breadcrumb */}
      <Card sx={{ mt: 12 }}>
        <Box>
          <Typography variant="h1">Privacy Policy</Typography>
          <Typography variant="body1" color="textSecondary">
            Pursuant to and for the effects of UK Data Protection Act 2018 (DPA 2018) and art. 13, EU Regulation 2016/679 (GDPR) we inform you that your personal data will be processed using electronic and manual tools, from the Controller, DIYnamo Ltd.
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box>
          <Typography variant="h3">Web site and applications</Typography>

          <Typography variant="body1" color="textSecondary">
            This information is given to those who interact with web services, electronically accessible by the following addresses: https://www.dreamhunters.io
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Purposes of processing</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            ‍The personal Data concerning the data subject is collected in order to allow the Controller to provide the services associated with the execution of the contract; to carry out all the activities necessary to reach the conclusion of a contract; more generally, to respond to specific requests of the data subject, providing the necessary services.
          </Typography>

          <Typography variant="body1" color="textSecondary">
            ‍In particular, personal data could be processed to use the provided services; sending newsletters.
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Recipients</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            Personal data will be processed exclusively by persons appointed / authorized and by processor.
          </Typography>

          <Typography variant="body1" color="textSecondary">
            Personal Data may be disclosed to public entities or judicial authorities, where required by law or to prevent or suppress the commission of a crime.
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Retention period</Typography>

          <Typography variant="body1" color="textSecondary">
            ‍Personal data will be kept for the period necessary for the pursuit of the purposes included in the point 3) (Legal basis of processing).
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Categories of data processed</Typography>

          <Typography variant="body1" color="textSecondary" mb={2}>
            The processed data include, in particular and eventually: personal data provided voluntarily by the data subject, in any format (text, graphic, audiovisual, multimedia, etc.), including data entered by filling in the form registration to the site or application, as well as to register for our newsletter;
          </Typography>

          <Typography variant="body1" color="textSecondary">
            personal data, (personal data, e-mail), collected through third parties, such as social networks, (es, Twitter, Telegram, Linkedin etc.)
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Right of access by the data subject</Typography>

          <Typography variant="body1" color="textSecondary">
            The data subject can exercise at any time to access/correct/delete Personal Data; The data subject has the right to lodge a complaint with a supervisory authority. The exercise of the rights can be activated by contacting the following e-mail address: hello@dreamhunters.io
          </Typography>
        </Box>
      </Card>

      <Card>
        <Box>
          <Typography variant="h3">Changes to this Privacy Policy</Typography>

          <Typography variant="body1" color="textSecondary">
            The Controller reserves the right to make changes to this Privacy Policy at any time.
          </Typography>
        </Box>
      </Card>
      <Footer />
    </PageContainer>
  );
};

export default Privacy;
