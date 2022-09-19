import React from 'react';
import { Box, Card, CardContent, Typography, ImageList, ImageListItem, ImageListItemBar, Grid, CardMedia } from '@mui/material';
import axios from 'axios';

const PhotosCard = ({ address, username }) => {

  const truncate = (str, n) => {
    return (str.length > n) ? `${str.substr(0, n - 1)} ...` : str;
  };

  async function getNft() {
    const data = {
      method: 'GET',
      url: 'https://api.rarible.org/v0.1/items/byOwner',
      params: {
        owner: `ETHEREUM:${address}`,
      }
    };
    try {
      const res = await axios.request(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    getNft().then(res => {
      setPhotos(res.data.items);
    });
  }, []);

  return (
    <Card sx={{
      p: { xs: 0 },
      textAlign: { xs: "center" },
    }}>
      <CardContent
        sx={{
          p: { xs: 0 },
          textAlign: { xs: "center" },
        }}>
        <Box display="flex" alignItems="center" sx={{
          p: { xs: 3 },
          textAlign: { xs: "center" },
        }}>
          <Typography variant="h3" fontWeight="500">
            Collection of {username ? username : `${address[0]}${address[1]}${address[2]}${address[3]}${address[4]} ... ${address[38]}${address[39]}${address[40]}${address[41]}`}
          </Typography>
        </Box>
        {photos.length > 0 ?
          <Grid container spacing={2}>
            {photos.map(photo => {
              return photo.meta ?
                <Grid item xs={12} sm={6} md={4} key={photo.id} sx={{ display: "flex" }}>
                  <Card sx={{ borderRadius: 2, width: "100%" }}>
                    <CardMedia
                      component="img"
                      image={photo.meta.content[0].url}
                      alt="I can't upload the image, sorry 😔"
                      sx={{ borderRadius: 1 }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        {photo.meta.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        {photo.meta.description ? truncate(photo.meta.description, 20) : "No description available 😢"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                : null
            }
            )}
          </Grid>
          :
          <>
            <Typography fontWeight="500" variant="h3" textAlign="center">
              No items to display
            </Typography>
          </>
        }
      </CardContent>
    </Card>
  );
};

export default PhotosCard;
