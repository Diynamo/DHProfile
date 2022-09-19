import React, { useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, Avatar, Tooltip } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaEthereum } from 'react-icons/fa';

// Image
import profileCover from '../../../assets/images/users/profileCover.png';
import profileImg from '../../../assets/images/users/profile.png';

const CoverCard = ({ user, profilePic, coverPic }) => {

  const [copied, setCopied] = useState(false);

  const copyAccount = (address) => {
    if (copied === false) {
      return (
        <CopyToClipboard
          options={{ message: "Copied" }}
          text={address}
          onCopy={() => setCopied(true)}
        >
          <Tooltip title="Copy address">
            {user ? <span><FaEthereum width="18" /> {user._id[0]}{user._id[1]}{user._id[2]}{user._id[3]}{user._id[4]} ... {user._id[38]}{user._id[39]}{user._id[40]}{user._id[41]}</span> : null}
          </Tooltip>
        </CopyToClipboard>
      )
    }
    setTimeout(() => { setCopied(false) }, 1500);
    return (
      <span>Copied</span>
    )
  }

  return (
    <Card
      sx={{
        padding: '0',
      }}
    >
      <Grid container spacing={0} >
        <Grid item xs={12} sx={{
          maxHeight: '30vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src={coverPic ? coverPic : profileCover} alt={coverPic ? coverPic : profileCover} width="100%" />
        </Grid>
      </Grid>

      <CardContent
        sx={{
          pt: '24px',
          pb: '28px',
        }}
      >
        <Grid container spacing={0}>
          {/* about profile */}
          <Grid
            item
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                mt: '-90px',
              }}
            >
              <Box>
                <Box
                  sx={{
                    background: (theme) => `${theme.palette.mode === 'dark' ? '#fff' : '#3c414c'}`,
                    padding: '4px',
                    borderRadius: '50%',
                    border: (theme) =>
                      `${theme.palette.mode === 'dark' ? '3px solid #3c414c' : '3px solid #fff'}`,
                    width: '110px',
                    height: '110px',
                    overflow: 'hidden',
                    margin: '0 auto',
                  }}
                >
                  <Avatar
                    src={profilePic ? profilePic : profileImg}
                    alt={profilePic ? profilePic : profileImg}
                    sx={{
                      borderRadius: '50%',
                      width: '96px',
                      height: '96px',
                      border: (theme) =>
                        `${theme.palette.mode === 'dark' ? '4px solid #3c414c' : '4px solid #fff'}`,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: '5px',
                    display: 'block',
                  }}
                >
                  <Typography
                    fontWeight="500"
                    sx={{
                      fontSize: '20px',
                      textAlign: 'center',
                    }}
                  >{user ? user.username : 'Unnamed'}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      textAlign: 'center',
                      pt: 1,
                    }}
                  >{user ? copyAccount(user._id) : null}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CoverCard;
