import React from 'react';

import { Card, CardContent, Box, Grid } from '@mui/material';

import Breadcrumb from '../../layouts/blank-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ProductCarousel from './components/CollectionCarousel';
import BlankCollectionDetail from './components/BlankCollectionDetail';

// Images
import img1 from '../../assets/images/collection/cristiano/1.png';
import img2 from '../../assets/images/collection/cristiano/2.png';
import img3 from '../../assets/images/collection/cristiano/3.png';
import img4 from '../../assets/images/collection/cristiano/4.png';
import img5 from '../../assets/images/collection/cristiano/5.png';
import img6 from '../../assets/images/collection/cristiano/6.png';
import img7 from '../../assets/images/collection/cristiano/7.png';
import Footer from '../../layouts/full-layout/footer/Footer';

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

const PrivateSale = () => {
    return (
        <PageContainer title="Dream Hunters | Private Sale" description="Private Sale of the Dream Hunters collection.">
            {/* breadcrumb */}
            <Breadcrumb />
            {/* end breadcrumb */}
            <Card sx={{
                mt: 12,
            }}>
                <CardContent>
                    <Grid container spacing={0} justifyContent="center">
                        <Grid item xs={12} sm={10} md={6} lg={4} justifyContent="center" alignSelf="center">
                            <Box sx={{ paddingRight: { xs: 0, md: '50px' }, maxWidth: '50vh', margin:'auto'  }}>
                                <ProductCarousel images={images} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={8} sx={{ mt: 2 }}>
                            <BlankCollectionDetail title="Cristiano Collection" desc={
                                <>
                                    This is the collection of Cristiano Ebenezer Yankah a boy from Ghana with the goal of winning the champions league. Today, Cristiano is in the process of going to Italy to play in the Serie A league. <br />

                                    Cristiano is Dream Hunters&apos; inspiration and is the first dream we are validating, of many more dreams to come true.
                                </>
                            } price={3} online />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Footer />
        </PageContainer>
    );
};

export default PrivateSale;
