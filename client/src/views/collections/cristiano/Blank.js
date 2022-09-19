import React from 'react';

import { Card, CardContent, Box, Grid } from '@mui/material';

import Breadcrumb from '../../../layouts/blank-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import CollectionCarousel from '../components/CollectionCarousel';
import CollectionDetail from '../components/CollectionDetail';
import CollectionDesc from '../components/CollectionDesc';

import Footer from '../../../layouts/full-layout/footer/Footer';

// Images
import img1 from '../../../assets/images/collection/cristiano/1.png';
import img2 from '../../../assets/images/collection/cristiano/2.png';
import img3 from '../../../assets/images/collection/cristiano/3.png';
import img4 from '../../../assets/images/collection/cristiano/4.png';
import img5 from '../../../assets/images/collection/cristiano/5.png';
import img6 from '../../../assets/images/collection/cristiano/6.png';
import img7 from '../../../assets/images/collection/cristiano/7.png';

const images = [
  {
    imgPath: img1,
    id: 1,
  },
  {
    imgPath: img2,
    id: 2,
  },
  {
    imgPath: img3,
    id: 3,
  },
  {
    imgPath: img4,
    id: 4,
  },
  {
    imgPath: img5,
    id: 5,
  },
  {
    imgPath: img6,
    id: 6,
  },
  {
    imgPath: img7,
    id: 7,
  },

];

const desc = [
  {
    label: 'Description',
    title: 'Cristiano needs 10,000 validators to activate his dream.',
    desc:
      <>
        From the moment I got the shoes from Andrea more than three years ago, I was more than happy because I never thought somebody I&apos;ve never met would have such sympathy and help me. I knew my parents would never be able to afford to buy soccer shoes for me. Coming all this far was a miracle to me. My mother&apos;s prayers worked. I am coming to Italy soon through Andrea and the team&apos;s support. Many people where I came from seek opportunities like this. I feel so happy that God has given me this chance. I worked and prayed for this day, trust me.<br /><br />
        My hometown has not been a better place for kids like me who are dreaming of better future someday. Aside from the school activities, we don&apos;t find options or opportunities to improve our talents. One of my dreams is to inspire kids like me to pursue their dreams. I work hard, and I believe that I will reach my dreams someday—regardless of all these struggles. I can see and feel that I&apos;m closer to my dreams than ever before.<br /><br />
        <strong>— Cristiano Ebenezer Yankah</strong>
      </>
  },
  {
    label: 'How it Works',
    title: 'What is “Spin & Drop”?',
    desc:
      <>
        After all of the 10,000 NFTs are dropped, one NFT holder will receive the “Dream Card” randomly.<br />
        All transactions with related addresses are meanwhile recorded in a Smart Contract on the Polygon blockchain<br /><br />
        “Spin & Drop” is a new and advanced free-gas war method using the Chainlink VRF (Verifiable Random Function), a secure and safe solution to drop NFTs without tampering.<br /><br />
        This is our solution to make sure that the new owners of the Dream Hunters NFTs are randomly selected to receive their NFTs.
      </>
  }
]

const Cristiano = () => {
  return (
    <PageContainer title="Dream Hunters | Collection" description="Mint your NFT of the Cristiano collection.">
      {/* breadcrumb */}
      <Breadcrumb />
      {/* end breadcrumb */}
      <Card sx={{
        mt: 12,
      }}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={10} md={6} lg={4} justifyContent="center" alignSelf="center">
              <Box sx={{ paddingRight: { xs: 0, md: '50px' } }}>
                <CollectionCarousel images={images} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8} sx={{ mt: 2 }}>
              <CollectionDetail title="Cristiano Collection" desc={
                <>
                  This is the collection of Cristiano Ebenezer Yankah a boy from Ghana with the goal of winning the champions league. Today, Cristiano is in the process of going to Italy to play in the Serie A league. <br />

                  Cristiano is Dream Hunters&apos; inspiration and is the first dream we are validating, of many more dreams to come true.
                </>
              } price={1} maxQty={10} online={false} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CollectionDesc desc={desc} />

      <Footer />
    </PageContainer>
  );
};

export default Cristiano;
