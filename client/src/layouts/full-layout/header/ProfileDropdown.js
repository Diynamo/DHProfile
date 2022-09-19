import React, { useState } from 'react';
import { Box, MenuItem, Typography, Avatar, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { FaEthereum } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import profileImg from '../../../assets/images/users/profile.png';

const ProfileDropdown = ({ username, address, profilePic }) => {

  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    if (copied === false) {
      return (
        <CopyToClipboard
          options={{ message: "Copied" }}
          text={sessionStorage.getItem('adr') ? sessionStorage.getItem('adr') : null}
          onCopy={() => setCopied(true)}
        >
          {address ?
            <span>{address[0]}{address[1]}{address[2]}{address[3]}{address[4]} ... {address[38]}{address[39]}{address[40]}{address[41]}</span>
            :
            <span>loading...</span>
          }
        </CopyToClipboard>
      )
    }
    setTimeout(() => { setCopied(false) }, 1500);
    return (
      <span>Copied</span>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          pb: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={profilePic !== null ? profilePic : profileImg}
            alt={profilePic !== null ? profilePic : profileImg}
            sx={{
              width: '90px',
              height: '90px',
            }}
          />
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: '1.235',
              }}
            >
              {username ? `${username}` : null}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                color="textSecondary"
                display="flex"
                alignItems="center"
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                  mr: 1,
                }}
              >
                <FaEthereum width="18" />
              </Typography>
              <Typography color="textSecondary" variant="h6">
                {copyAccount()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />
      <Link
        style={{
          textDecoration: 'none',
        }}
        to="/profile"
      >
        <Box>
          <MenuItem
            sx={{
              pt: 3,
              pb: 3,
            }}
          >
            <Box display="flex" alignItems="center">
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                  boxShadow: 'none',
                  minWidth: '50px',
                  width: '45px',
                  height: '40px',
                  borderRadius: '15px',
                }}
              >
                <FeatherIcon icon="user" width="18" height="18" />
              </Button>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    lineHeight: '1.235',
                  }}
                  color="textPrimary"
                >
                  My Profile
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: 'none',
        }}
        to="/edit-profile"
      >
        <Box>
          <MenuItem
            sx={{
              pt: 3,
              pb: 3,
            }}
          >
            <Box display="flex" alignItems="center">
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                  boxShadow: 'none',
                  minWidth: '50px',
                  width: '45px',
                  height: '40px',
                  borderRadius: '15px',
                }}
              >
                <FeatherIcon icon="settings" width="18" height="18" />
              </Button>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    lineHeight: '1.235',
                  }}
                  color="textPrimary"
                >
                  Edit Profile
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Box>
      </Link>
    </Box>
  );
};

export default ProfileDropdown;
