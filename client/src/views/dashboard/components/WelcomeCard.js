import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Box, Grid } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaEthereum } from 'react-icons/fa';

// Server 
import { getUser } from '../../../server/users';

// Web 3 
import { useWeb3React } from "@web3-react/core";

// Random image
import JeffBezos from '../../../assets/images/celebrities/JeffBezos.png';
import Ibrahimovic from '../../../assets/images/celebrities/Ibrahimovic.png';
import Messi from '../../../assets/images/celebrities/Messi.png';
import LuigiBros from '../../../assets/images/celebrities/LuigiBros.png';
import SteveJobs from '../../../assets/images/celebrities/SteveJobs.png';
import BillGates from '../../../assets/images/celebrities/BillGates.png';
import TravisScott from '../../../assets/images/celebrities/TravisScott.png';
import CristianoRonaldo from '../../../assets/images/celebrities/CristianoRonaldo.png';
import ViltalikButerin from '../../../assets/images/celebrities/ViltalikButerin.png';
import Shumacher from '../../../assets/images/celebrities/Shumacher.png';
import Twopac from '../../../assets/images/celebrities/Twopac.png';
import KimKardashan from '../../../assets/images/celebrities/KimKardashan.png';
import PapaFrancesco from '../../../assets/images/celebrities/PapaFrancesco.png';
import Anonymous from '../../../assets/images/celebrities/Anonymous.png';
import MarkZuckerberg from '../../../assets/images/celebrities/MarkZuckerberg.png';
import PabloEscobar from '../../../assets/images/celebrities/PabloEscobar.png';
import Queen from '../../../assets/images/celebrities/Queen.png';
import Eminem from '../../../assets/images/celebrities/Eminem.png';
import WarrenBuffet from '../../../assets/images/celebrities/WarrenBuffet.png';

const randomImage = [JeffBezos, Ibrahimovic, Messi, LuigiBros, SteveJobs, BillGates, TravisScott, CristianoRonaldo, ViltalikButerin, Shumacher, Twopac, KimKardashan, PapaFrancesco, Anonymous, MarkZuckerberg, PabloEscobar, Queen, Eminem, WarrenBuffet];
const randomIndex = Math.floor(Math.random() * randomImage.length);

const WelcomeCard = () => {

  // START CONNECT TO WEB 3.0
  const web3React = useWeb3React();

  const [currentAccount, setCurretnAccount] = useState(sessionStorage.getItem('adr'));
  const [currentUser, setCurrentUser] = useState(null);

  const [copied, setCopied] = useState(false);

  console.log(randomImage.length);
  console.log(randomIndex);

  const copyAccount = (address) => {
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

  useEffect(() => {
    // Check if wallet is connected
    if (currentAccount === null) {
      setCurretnAccount(web3React.account);
      getUser(web3React.account).then(res => {
        setCurrentUser(res);
      });
    }
    if (currentAccount !== null) {
      getUser(currentAccount).then(res => {
        setCurrentUser(res);
      });
    }

  }, [web3React.account]);

  return (
    <Card
      elevation={0}
      className="welcomebg"
      sx={{
        position: 'relative',
        backgroundColor: (theme) => `${theme.palette.mode === 'dark' ? '#32363e' : ''}`,
        borderWidth: '0px',
      }}
    >
      <CardContent sx={{ minHeight: "190px", paddingBottom: "24px" }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography
              sx={{
                marginTop: '5px',
                marginBottom: '0px',
                lineHeight: '35px',
                position: 'relative',
                zIndex: 9,
                mt: '15px',
              }}
              variant="h3"
              gutterBottom
            >
              Welcome back 👋
            </Typography>
            <Box
              sx={{
                display: {
                  sm: 'flex',
                  xs: 'block',
                },
                alignItems: 'flex-end',
              }}
            >
              <Typography
                fontWeight="900"
                sx={{
                  marginTop: '10px',
                  marginBottom: '0px',
                  lineHeight: '35px',
                  position: 'relative',
                  zIndex: 9,
                }}
                variant="h2"
                gutterBottom
              >
                {currentUser ? currentUser.username ? `${currentUser.username}` :
                  <>
                    <FaEthereum />{copyAccount(currentAccount)}
                  </> : null}
              </Typography>
            </Box>
            {currentUser ? currentUser.username ?
              <Typography
                fontWeight="900"
                sx={{
                  marginTop: '10px',
                  marginBottom: '0px',
                  lineHeight: '35px',
                  position: 'relative',
                  zIndex: 9,
                }}
                variant="h4"
                gutterBottom
              >
                <FaEthereum />{copyAccount(currentAccount)}
              </Typography>
              : null : null}
          </Grid>
          <Grid item xs={4} sx={{
            textAlign: "center",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Box component="img" src={randomImage[randomIndex]} alt="Celebrities" sx={{
              maxWidth: '210px',
              position: "absolute",
              bottom: "0px",
              right: {
                xs: "-25px",
                md: "0px",
              },
            }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;
