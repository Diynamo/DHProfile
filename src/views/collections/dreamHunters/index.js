import React from 'react';

import { Card, CardContent, Box, Grid } from '@mui/material';

import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import CollectionCarousel from '../components/CollectionCarousel';
import CollectionDetail from '../components/CollectionDetail';
import CollectionDesc from '../components/CollectionDesc';

// Images
import img1 from '../../../assets/images/collection/dreamHunters/1.png';
import img2 from '../../../assets/images/collection/dreamHunters/2.png';
import img3 from '../../../assets/images/collection/dreamHunters/3.png';
import img4 from '../../../assets/images/collection/dreamHunters/4.png';
import img5 from '../../../assets/images/collection/dreamHunters/5.png';
import img6 from '../../../assets/images/collection/dreamHunters/6.png';
import img7 from '../../../assets/images/collection/dreamHunters/7.png';
import img8 from '../../../assets/images/collection/dreamHunters/8.png';
import img9 from '../../../assets/images/collection/dreamHunters/9.png';
import img10 from '../../../assets/images/collection/dreamHunters/10.png';
import img11 from '../../../assets/images/collection/dreamHunters/11.png';
import img12 from '../../../assets/images/collection/dreamHunters/12.png';
import img13 from '../../../assets/images/collection/dreamHunters/13.png';
import img14 from '../../../assets/images/collection/dreamHunters/14.png';
import img15 from '../../../assets/images/collection/dreamHunters/15.png';
import img16 from '../../../assets/images/collection/dreamHunters/16.png';
import img17 from '../../../assets/images/collection/dreamHunters/17.png';
import img18 from '../../../assets/images/collection/dreamHunters/18.png';
import img19 from '../../../assets/images/collection/dreamHunters/19.png';
import img20 from '../../../assets/images/collection/dreamHunters/20.png';
import img21 from '../../../assets/images/collection/dreamHunters/21.png';
import img22 from '../../../assets/images/collection/dreamHunters/22.png';
import img23 from '../../../assets/images/collection/dreamHunters/23.png';
import img24 from '../../../assets/images/collection/dreamHunters/24.png';
import img25 from '../../../assets/images/collection/dreamHunters/25.png';
import img26 from '../../../assets/images/collection/dreamHunters/26.png';
import img27 from '../../../assets/images/collection/dreamHunters/27.png';
import img28 from '../../../assets/images/collection/dreamHunters/28.png';
import img29 from '../../../assets/images/collection/dreamHunters/29.png';
import img30 from '../../../assets/images/collection/dreamHunters/30.png';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/dream-incubator',
    title: 'Dream Incubator',
  },
  {
    title: 'Dream Hunters',
  },
];

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
  {
    imgPath: img8,
    id: 8,
  },
  {
    imgPath: img9,
    id: 9,
  },
  {
    imgPath: img10,
    id: 10,
  },
  {
    imgPath: img11,
    id: 11,
  },
  {
    imgPath: img12,
    id: 12,
  },
  {
    imgPath: img13,
    id: 13,
  },
  {
    imgPath: img14,
    id: 14,
  },
  {
    imgPath: img15,
    id: 15,
  },
  {
    imgPath: img16,
    id: 16,
  },
  {
    imgPath: img17,
    id: 17,
  },
  {
    imgPath: img18,
    id: 18,
  },
  {
    imgPath: img19,
    id: 19,
  },
  {
    imgPath: img20,
    id: 20,
  },
  {
    imgPath: img21,
    id: 21,
  },
  {
    imgPath: img22,
    id: 22,
  },
  {
    imgPath: img23,
    id: 23,
  },
  {
    imgPath: img24,
    id: 24,
  },
  {
    imgPath: img25,
    id: 25,
  },
  {
    imgPath: img26,
    id: 26,
  },
  {
    imgPath: img27,
    id: 27,
  },
  {
    imgPath: img28,
    id: 28,
  },
  {
    imgPath: img29,
    id: 29,
  },
  {
    imgPath: img30,
    id: 30,
  },
];

const desc = [
  {
    label: 'Description',
    title: 'Our Genesis Collection',
    desc:
      <>
        10,001 young dreamers with their own unique heroic traits and skills, with the absolute missions of chasing their dreams and unifying the people worldwide by building one of the strongest communities in the NFT space!
      </>
  },
  {
    label: 'Benefits',
    title: "A Holder's Benefits",
    desc:
      <>
        <strong>Dream Box</strong><br />
        100 holders will receive a box with a metal NFC card version of their NFTs, and will give them access to our events around the world (Benvenuto in Italia!), plus complementary traveling perks!<br /><br />
        <strong>Monthly Royalties</strong><br />
        Every time a Dream Hunters NFT is sold (on the secondary market), there is a total of 15% Rolling Royalties that will be distributed to our holders. For more detailed computation, please check out the Rolling Royalties section.<br /><br />
        <strong>Diynamo Airdrop</strong><br />
        Every month, each holder of the Dream Hunters NFT collection will receive $DIYM coins airdrop from our DIYnamo project for the first one year.<br /><br />
        <strong>Random Select</strong><br />
        We have random rewards for one randomly selected Dream Hunter NFT holder every month! This lucky holder will receive ETH and mystery prizes from the community wallet.<br />
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
];

const DreamHunters = () => {
  return (
    <PageContainer title="Dream Hunters | Collection" description="Mint your NFT of the Dream Hunters collection.">
      {/* breadcrumb */}
      <Breadcrumb title="Shop Dream Hunters" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <CardContent>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={12} sm={10} md={6} lg={5} justifyContent="center" alignSelf="center">
              <Box sx={{ paddingRight: { xs: 0, md: '50px' } }}>
                <CollectionCarousel images={images} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={7} sx={{ mt: 2 }}>
              <CollectionDetail title="Dream Hunters Collection" desc={
                <>
                  Dream Hunters is an NFT community that supports promising talents through investing in their <strong>NFT collections that represent their dream</strong>. Holding one of the 10.001 NFTs gives you access to be part of the first decentralized dream-funding platform.
                </>
              } price={250} maxQty={4} online={false} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CollectionDesc desc={desc} />
    </PageContainer>
  );
};

export default DreamHunters;
