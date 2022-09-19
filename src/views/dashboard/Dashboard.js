import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

import {
  WelcomeCard,
  EthPrice,
  BtcPrice,
  CollectionPreview,
} from './components';

import cCollection from '../../assets/images/collection/coverCristiano.png';
import dhCollection from '../../assets/images/collection/coverDream.png';

const Dashboard = () => {

  useEffect(() => {
    // Check if user is authenticated
    if (!sessionStorage.getItem('adr')) {
      window.location.reload(false);
    }
  }, []);

  return (
    // 2

    <PageContainer title="Dream Hunters" description="The First Dream-Funding Decentralized Platform">
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} sm={12} lg={6}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <EthPrice />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <BtcPrice />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} md={6} lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <CollectionPreview imgCover={dhCollection} title="Dream Hunters Collection" desc="Dream Hunters is an NFT community that supports promising talents through investing in their NFT collections that represent their dream." urlCollection="/dream/dream-hunters" launchDate="To be announced" online={false} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <CollectionPreview imgCover={cCollection} title="Cristiano Dream" desc="This is the collection of Cristiano Ebenezer Yankah a boy from Ghana with the goal of winning the champions league." urlCollection="/dream/cristiano" launchDate="To be announced" online={false} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
