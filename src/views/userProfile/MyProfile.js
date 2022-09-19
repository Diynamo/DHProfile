import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CoverCard from './components/CoverCard';
import IntroCard from './components/IntroCard';
import PhotosCard from './components/PhotosCard';
import TransactionTable from './components/TransactionTable';

// Web3 
import { useWeb3React } from '@web3-react/core';
import img1 from '../../assets/images/collection/cristiano/1.png';
import { getBalance, getList } from '../../web3/cristianoWhitelist';
import { getUser } from '../../server/users';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'My Profile',
  },
];

const MyProfile = () => {
  const [rows, setRows] = useState([]);

  // START CONNECT TO WEB 3.0
  const web3React = useWeb3React();
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePic, setProfilePic] = useState(false);
  const [coverPic, setCoverPic] = useState(false);
  const [showNft, setShowNft] = useState(false);

  const userId = sessionStorage.getItem('adr');

  useEffect(() => {
    if (web3React.active) {
      getUser(web3React.account).then(result => {
        setCurrentUser(result);
        setProfilePic(result.profilePic);
        setCoverPic(result.coverPic);
        setShowNft(result.showNft);
      });

      getBalance(web3React.account).then(result => {
        if (result) {
          const id = result.id_tx.split(';');
          const hash = (result.hash_tx).split(';');
          const method = (result.method).split(';');

          for (let i = 0; i < id.length; i++) {
            getList(id[i]).then(res => {
              if (res) {
                const total = (parseFloat(res[4])/1000000).toFixed(2);
                const qty = res[3];
                const obj = {
                  hash: hash[i],
                  imgsrc: img1,
                  dream: 'Cristiano Dream',
                  qty: qty,
                  total: total,
                  method: method[i],
                  status: 'Completed',
                };
                setRows(prevState => [...prevState, obj]);
              }
            });
          }
        }
      });

    } else {
      getUser(userId).then(res => {
        setCurrentUser(res);
        setProfilePic(res.profilePic);
        setCoverPic(res.coverPic);
        setShowNft(res.showNft);
      });

      getBalance(userId).then(result => {
        if (result) {
          const id = result.id_tx.split(';');
          const hash = (result.hash_tx).split(';');
          const method = (result.method).split(';');

          for (let i = 0; i < id.length; i++) {
            getList(id[i]).then(res => {
              if (res) {
                const total = (parseFloat(res[4])/1000000).toFixed(2);
                const qty = res[3];
                const obj = {
                  hash: hash[i],
                  imgsrc: img1,
                  dream: 'Cristiano Dream',
                  qty: qty,
                  total: total,
                  method: method[i],
                  status: 'Completed',
                };
                setRows(prevState => [...prevState, obj]);
              }
            });
          }
        }
      });

    }
  }, []);

  return (
    <PageContainer title={currentUser ? currentUser.username ? `Dream Hunters | ${currentUser.username}` : "Dream Hunters | Profile" : "Dream Hunters | Profile"} description={currentUser ? `This is ${currentUser.username} Profile page` : "This is User Profile page"}>
      {/* breadcrumb */}
      <Breadcrumb title={currentUser ? currentUser.username ? currentUser.username : 'My Profile' : 'My Profile'} items={BCrumb} />
      {/* end breadcrumb */}
      {currentUser ? <CoverCard user={currentUser} profilePic={profilePic} coverPic={coverPic} /> : <CoverCard user={null} profilePic={profilePic} coverPic={coverPic} />}
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {rows.length !== 0 ? <TransactionTable rows={rows} /> : null }
        </Grid>

        <Grid item xs={12}>
          {currentUser ? <IntroCard user={currentUser} /> : <IntroCard user={null} />}
        </Grid>
        <Grid item xs={12}>
          {showNft ? currentUser ? currentUser.username ?
            <PhotosCard address={currentUser._id} username={currentUser.username} />
            :
            <PhotosCard address={currentUser._id} username={null} />
            :
            <PhotosCard address={currentUser._id} username={null} />
            : null}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default MyProfile;
