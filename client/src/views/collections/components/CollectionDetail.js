import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  Chip,
  MenuItem,
  FormControl,
  Button,
  Divider,
} from '@mui/material';
import CustomSelect from '../../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

const CollectionDetail = ({ title, maxQty, desc, online, price }) => {

  const [qtyArr, setQtyArr] = React.useState([]);

  React.useEffect(() => {
    const arrQty = [];
    for (let i = 1; i <= maxQty; i++) {
      arrQty.push(i);
    }
    setQtyArr(arrQty);
  }, [])

  //   Qty
  const [qty, setQty] = React.useState('1');

  const handleChange3 = (event3) => {
    setQty(event3.target.value);
  };

  const QtyMenuItem = () => {
    const listeItem = qtyArr.map((number) =>
      <MenuItem key={number.toString()} value={number}>{number}</MenuItem>
    );
    return (
      <CustomSelect
        labelId="qty-label"
        id="qty-select-outlined"
        value={qty}
        onChange={handleChange3}
        fullWidth
        size="small"
      >
        {listeItem}
      </CustomSelect>
    );
  }

  return (
    <Box>
      {/* stock text */}
      <Box display="flex" alignItems="center">
        {
          online ?
            <Chip
              label="Online"
              color="success"
              sx={{
                borderRadius: '6px',
                pl: '8px',
                pr: '8px',
                pt: '3px',
                pb: '3px',
                color: '#fff',
                height: 'unset',
                mr: '10px',
                '& .MuiChip-label': {
                  pl: 0,
                  pr: 0,
                },
              }}
            />
            :
            <Chip
              label="Coming soon"
              color="warning"
              sx={{
                borderRadius: '6px',
                pl: '8px',
                pr: '8px',
                pt: '3px',
                pb: '3px',
                color: '#fff',
                height: 'unset',
                mr: '10px',
                '& .MuiChip-label': {
                  pl: 0,
                  pr: 0,
                },
              }}
            />
        }
      </Box>
      {/* title */}
      <Typography
        fontWeight="600"
        sx={{
          fontSize: {
            xs: '24px',
            sm: '30px',
            lg: '30px',
          },
          mt: '5px',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="400"
        sx={{
          mt: '10px',
          color: (theme) => theme.palette.grey.A200,
        }}
      >
        {desc}
      </Typography>
      {
        online ?
          <>
            <Typography
              fontWeight="600"
              sx={{
                fontSize: {
                  xs: '24px',
                  sm: '30px',
                  lg: '30px',
                },
                mt: '20px',
              }}
            >
              ${price}
            </Typography>
            {/* Quantity */}
            <Divider />
            <Box
              sx={{
                pt: 3,
                pb: 3,
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <CustomFormLabel
                      htmlFor="qty-select-outlined"
                      sx={{
                        mt: 0,
                      }}
                    >
                      Qty.
                    </CustomFormLabel>
                    <Box
                      sx={{
                        ml: 2,
                        width: '100%',
                      }}
                    >
                      <FormControl variant="outlined" fullWidth>
                        {maxQty ?
                          <QtyMenuItem />
                          :
                          <CustomSelect
                            labelId="qty-label"
                            id="qty-select-outlined"
                            value={qty}
                            onChange={handleChange3}
                            fullWidth
                            size="small"
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                          </CustomSelect>
                        }
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
              }}
            >
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{
                    pt: '13px',
                    pb: '13px',
                    display: 'block',
                    width: '100%',
                    borderRadius: '9px',
                  }}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </>
          : null
      }
    </Box >
  );
};

CollectionDetail.propTypes = {
  title: PropTypes.string.isRequired,
  maxQty: PropTypes.number,
  desc: PropTypes.string.isRequired,
  online: PropTypes.bool,
  price: PropTypes.number.isRequired,
};

export default CollectionDetail;
