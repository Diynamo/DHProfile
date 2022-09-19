import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import BlankCoverCard from './components/BlankCoverCard';
import IntroCard from './components/IntroCard';
import PhotosCard from './components/PhotosCard';

import { checkUser, getUser, getUserName } from '../../server/users';

const UsersProfile = () => {

  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(false);
  const [coverPic, setCoverPic] = useState(false);
  const [showNft, setShowNft] = useState(false);

  const userId = window.location.pathname.substring(1);

  useEffect(() => {
    checkUser(userId).then(result => {
      if (result) {
        getUser(userId).then(res => {
          setUser(res);
          setProfilePic(res.profilePic);
          setCoverPic(res.coverPic);
          setShowNft(res.showNft);
        });
      } else {
        getUserName(userId).then(res => {
          setUser(res);
          setProfilePic(res.profilePic);
          setCoverPic(res.coverPic);
          setShowNft(res.showNft);
        });
      }
    });
  }, []);


  return (
    <PageContainer title={user ? user.username ? `Dream Hunters | ${user.username}` : "Dream Hunters | Profile" : "Dream Hunters | Profile"} description={user ? `This is ${user.username} Profile page` : "This is User Profile page"}>

      {user ? <BlankCoverCard user={user} profilePic={profilePic} coverPic={coverPic} /> : <BlankCoverCard user={null} profilePic={profilePic} coverPic={coverPic} />}
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {user ? <IntroCard user={user} /> : <IntroCard user={null} />}
        </Grid>
        <Grid item xs={12}>
          {showNft ? user ? user.username ?
            <PhotosCard address={user._id} username={user.username} />
            :
            <PhotosCard address={user._id} username={null} />
            :
            <PhotosCard address={user._id} username={null} />
            : null}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UsersProfile;
