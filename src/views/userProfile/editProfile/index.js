import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Grid, Typography, Button, Tooltip, IconButton, FormControlLabel, Switch } from '@mui/material';
import { FaEthereum } from 'react-icons/fa';
import FeatherIcon from 'feather-icons-react';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

// Image
import profileCover from '../../../assets/images/users/profileCover.png';
import profileImg from '../../../assets/images/users/profile.png';

// Web3
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from '../../../web3/hooks';

// Server
import { getUser, getUsers, updateUser, deleteUser } from '../../../server/users';

// Redux
import { fetchLinks, addLink, updateLink, deleteLink } from '../../../redux/links/Action';
import { setConnect } from '../../../redux/customizer/Action';


const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // USER VARIBLE

  const userId = sessionStorage.getItem('adr');
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [social, setSocial] = useState(null);
  const [nftCollection, setNftCollection] = useState(true);

  const [validUsername, setValidUsername] = useState(true);
  const [uniqueUsername, setUniqueUsername] = useState(true);
  const [listUsername, setListUsername] = useState(null);
  const [validEmail, setValidEmail] = useState(true);
  const [validNewLinkTitle, setValidNewLinkTitle] = useState(false);
  const [validNewLinkUrl, setValidNewLinkUrl] = useState(false);
  const [checkedIsUrlProfile, setCheckedIsUrlProfile] = useState(false);
  const [checkedIsUrlCover, setCheckedIsUrlCover] = useState(false);

  const [newLinkTitle, setNewLinkTitle] = useState(null);
  const [newLinkUrl, setNewLinkUrl] = useState(null);

  // END USER VARIBLE

  // START CONNECT TO WEB 3.0

  const web3React = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === web3React.connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, web3React.connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // END CONNECT TO WEB 3.0

  // START VALIDATOR 

  function usernamefieldValidator(ogg) {
    return (!/\s/g.test(ogg));
  }

  function emailfieldValidator(ogg) {
    return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(ogg));
  }

  function checkValid(ogg) {
    return (ogg !== null && ogg !== "");
  }

  function isUrlOrBlank(ogg) {
    let updt = true;
    if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_]*)/g.test(ogg) || !checkValid(ogg)) {
      updt = false;
    }
    return updt;
  }

  // END VALIDATOR

  // START UPDATE DATA 

  const updateUsername = (event, value) => {
    if (checkValid(value)) {
      if (usernamefieldValidator(value)) {
        setValidUsername(true);
        setUsername(value);
      } else {
        setValidUsername(false);
      }
    } else {
      if (currentUser.username) {
        setUsername(currentUser.username);
      }
      setUsername(null);
    }

    const userLow = value.toLowerCase();


    if (listUsername.includes(userLow)) {
      setUniqueUsername(false);
    } else {
      setUniqueUsername(true);
    }

    event.preventDefault();
  };

  const updateBio = (event, value) => {
    setBio(value);
    event.preventDefault();
  };

  const updateMail = (event, value) => {
    if (checkValid(value)) {
      if (emailfieldValidator(value)) {
        setValidEmail(true);
        setEmail(value);
      } else {
        setValidEmail(false);
      }
    } else {
      setValidEmail(false);
    }
    event.preventDefault();
  };

  const addPicProfile = (event, value) => {
    setProfilePic(value);
    event.preventDefault();
  }

  const addPicCover = (event, value) => {
    setCoverPic(value);
    event.preventDefault();
  }

  const addNewLinkTitle = (event, value) => {
    const removeSpaces = value.replace(/\s/g, '');
    if (checkValid(removeSpaces)) {
      setValidNewLinkTitle(true);
      setNewLinkTitle(value);

    } else {
      setValidNewLinkTitle(false);
    }

    event.preventDefault();
  }

  const addNewLinkUrl = (event, value) => {
    if (isUrlOrBlank(value)) {
      setValidNewLinkUrl(true);
      setNewLinkUrl(value);

    } else {
      setValidNewLinkUrl(false);
    }
    event.preventDefault();
  }

  const updateLinkUrl = (event, url, id) => {
    const removeSpaces = url.replace(/\s/g, '');
    if (isUrlOrBlank(removeSpaces)) {
      setSocial({ ...social, [id]: url });
    }
    event.preventDefault();
  }

  const handleNftCollection = () => {
    setNftCollection(!nftCollection);
  }

  // END UPDATE DATA

  useEffect(() => {
    if (web3React.active) {
      getUser(web3React.account).then(result => {
        setCurrentUser(result);

        setUsername(result.username);
        setEmail(result.email);
        setBio(result.bio);
        setNftCollection(result.showNft);
        setSocial(result.social);
        if (result.profilePic && result.profilePic !== null) {
          setCheckedIsUrlProfile(true);
          setProfilePic(result.profilePic);
        }
        if (result.coverPic && result.coverPic !== null) {
          setCheckedIsUrlCover(true);
          setCoverPic(result.coverPic);
        }
      });
    } else {
      getUser(userId).then(res => {
        setCurrentUser(res);

        setUsername(res.username);
        setEmail(res.email);
        setBio(res.bio);
        setNftCollection(res.showNft);
        setSocial(res.social);
        if (res.profilePic && res.profilePic !== null) {
          setCheckedIsUrlProfile(true);
          setProfilePic(res.profilePic);
        }
        if (res.coverPic && res.coverPic !== null) {
          setCheckedIsUrlCover(true);
          setCoverPic(res.coverPic);
        }
      });
    }

    const list = []

    getUsers().then(res => {
      if (res && res.length) {
        res.forEach(element => {
          if (element.username) {
            const userLow = element.username.toLowerCase();
            list.push(userLow);
            setListUsername(list);
          }
        });
      }
    });

  }, []);

  // LINKS COMPONENTS

  const idLink = useSelector((state) => state.linksReducer.links.length + 1);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  const filterLink = (links) => {
    return links.filter((t) => !t.deleted);
  };

  const links = useSelector((state) => filterLink(state.linksReducer.links));

  useEffect(() => {
    getUser(userId).then(res => {
      if (res && res.social) {
        const socialRes = res.social;
        let socialId = 0;
        // eslint-disable-next-line 
        Object.keys(socialRes).forEach(function (key) {
          switch (key) {
            case 'website':
              socialId++;
              break;
            case 'twitter':
              socialId++;
              break;
            case 'instagram':
              socialId++;
              break;
            default:
              break;
          }
        });
        // eslint-disable-next-line 
        Object.keys(socialRes).forEach(function (key) {
          switch (key) {
            case 'website':
              dispatch(updateLink(1, socialRes[key]));
              break;
            case 'twitter':
              dispatch(updateLink(2, socialRes[key]));
              break;
            case 'instagram':
              dispatch(updateLink(3, socialRes[key]));
              break;
            default:
              socialId++;
              dispatch(addLink(socialId, key, socialRes[key]));
              break;
          }
        });

      }
    });
  }, []);

  // END LINKS COMPONENTS

  /* ******************************************************** */
  // Testnet switch
  /* ******************************************************** */

  const switchNetwork = async () => {
    try {
      await web3React.library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x80001" }],
      });
    } catch (switchError) {
      console.error(switchError);
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await web3React.library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "80001",
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                chainName: "Polygon Testnet",
                nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              }
            ],
          });
        } catch (error) {
          console.error(error)
        }
      }
    }
  };

  /* ******************************************************** */
  // End Testnet switch
  /* ******************************************************** */



  async function signUpdate(e) {

    // Change Network for Testnet 
    if (web3React.chainId !== 80001) {
      switchNetwork();
    }

    const formdata = new FormData();
    username ? formdata.append('username', username) : null;
    email ? formdata.append('email', email) : null;
    bio ? formdata.append('bio', bio) : null;
    nftCollection ? formdata.append('showNft', nftCollection) : null;
    social ? formdata.append('social', JSON.stringify(social)) : null;
    checkedIsUrlProfile ? formdata.append('profilePic', profilePic) : (profilePic ? formdata.append('profilePic', profilePic, profilePic.name) : "cazz");
    checkedIsUrlCover ? formdata.append('coverPic', coverPic) : (coverPic ? formdata.append('coverPic', coverPic, coverPic.name) : null);

    const message = `👋 update your Dream Hunters profile.\nThe data you are updating are as follows:\nUsername: ${username}\n Email: ${email}\n Bio: ${bio}\n Show my NFT Collection: ${nftCollection}\n Social: ${JSON.stringify(social)}`;

    web3React.library
      .getSigner(web3React.account)
      .signMessage(message)
      .then(() => {
        updateUser(web3React.account, formdata).then(() => {
          navigate('/profile');
        }
        ).catch(err => {
          console.log(err);
        });
      })
      .catch(error => {
        console.log(error);
      });

    e.preventDefault();
  }

  async function disconnect(e) {
    web3React.deactivate();
    dispatch(setConnect(false))
    sessionStorage.removeItem('adr');
    navigate('/');
    e.preventDefault();
  }

  async function signDelete(e) {

    // Change Network for Testnet 
    if (web3React.chainId !== 80001) {
      switchNetwork();
    }

    const message = `⚠️ATTENTION⚠️\nYou are deleting your information.\nIf you are sure you want to continue, please sign this message. 😕\nOtherwise cancel.\n⚠️ATTENTION⚠️`;

    web3React.library
      .getSigner(web3React.account)
      .signMessage(message)
      .then(() => {
        deleteUser(web3React.account).then(() => {
          disconnect(e);
        }
        ).catch(err => {
          console.log(err);
        });
      })
      .catch(error => {
        console.log(error);
      });

    e.preventDefault();
  }

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/profile',
      title: 'My Profile',
    },
    {
      title: 'Edit Profile',
    },
  ];

  return (
    <PageContainer title="Dream Hunters | Profile" description="Edit yuor profile of Dream Hunters account">
      <Breadcrumb title="Edit Profile" items={BCrumb} />
      <Grid container spacing={0}>
        <Grid item lg={4} md={12} xs={12}>
          <Card sx={{ p: 3, textAlign: "center", justifyContent: "center" }}>
            <Typography variant="h1" sx={{ mt: 3 }}>
              {currentUser ? currentUser.username ? currentUser.username : 'Unnamed' : 'Unnamed'}
            </Typography>
            <Typography variant="body2"><FaEthereum width="18" /> {web3React.active ? `${web3React.account[0]}${web3React.account[1]}${web3React.account[2]}${web3React.account[3]}${web3React.account[4]} ... ${web3React.account[38]}${web3React.account[39]}${web3React.account[40]}${web3React.account[41]}` : `${userId[0]}${userId[1]}${userId[2]}${userId[3]}${userId[4]} ... ${userId[38]}${userId[39]}${userId[40]}${userId[41]}`}</Typography>

            <Grid container spacing={0}>
              <Grid item lg={12} md={6} sm={6} xs={12} justifyContent="center" sx={{ mt: 2 }}>
                <Avatar alt="Profile Pic" src={checkedIsUrlProfile ? profilePic : profilePic ? URL.createObjectURL(profilePic) : profileImg} sx={{ width: 110, height: 110, m: "auto" }} />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Profile Picture
                  <input onChange={(e) => { addPicProfile(e, e.target.files[0]); }} type="file" accept="image/*" hidden />
                </Button>
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12} justifyContent="center" sx={{ mt: 2 }}>
                <Avatar alt="Cover Pic" src={checkedIsUrlCover ? coverPic : coverPic ? URL.createObjectURL(coverPic) : profileCover} sx={{ width: 220, height: 110, borderRadius: 3, m: "auto" }} variant="square" />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Cover Picture
                  <input onChange={(e) => { addPicCover(e, e.target.files[0]); }} type="file" accept="image/*" hidden />
                </Button>
              </Grid>
            </Grid>

            <Typography variant="h5" fontWeight="600" sx={{ mt: 3 }}>
              Show my NFT collection
            </Typography>

            <FormControlLabel control={<Switch checked={nftCollection} onClick={handleNftCollection} />} label={nftCollection ? "On" : "Off"} />

            <Typography variant="h5" fontWeight="600" sx={{ mt: 3 }}>
              Delete all my information
            </Typography>
            <Button color="error" variant="contained" sx={{ mt: 3 }} onClick={(e) => signDelete(e)}>
              Delete Account
            </Button>
          </Card>
        </Grid>
        <Grid item lg={8} md={12} xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
              Edit Details
            </Typography>

            <CustomFormLabel htmlFor="name">Username</CustomFormLabel>
            {validUsername ? uniqueUsername ?
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                placeholder={username}
                onChange={(e) => { updateUsername(e, e.target.value); }}
              />
              :
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                placeholder={username}
                size="small"
                error
                helperText="Username already used, use another one."
                onChange={(e) => { updateUsername(e, e.target.value); }}
              />
              :
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                placeholder={username}
                size="small"
                error
                helperText="Incorrect format. No spaces. Use - or _"
                onChange={(e) => { updateUsername(e, e.target.value); }}
              />
            }

            <CustomFormLabel htmlFor="Email">Email</CustomFormLabel>
            {validEmail ?

              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                placeholder={email}
                onChange={(e) => { updateMail(e, e.target.value); }}
              />
              :
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                placeholder={email}
                size="small"
                error
                helperText="Use a valid email."
                onChange={(e) => { updateMail(e, e.target.value); }}
              />
            }

            <CustomFormLabel htmlFor="project-details">Short Description</CustomFormLabel>
            <CustomTextField
              id="bio"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              placeholder={bio}
              onChange={(e) => { updateBio(e, e.target.value); }}
            />

            <Typography variant="h5" fontWeight="600" sx={{ mb: 3, mt: 3 }}>
              Edit your social networks
            </Typography>
            <Grid container spacing={0} justifyContent="center">
              {links && links.length ?
                <>
                  {links.map((link) => (
                    <Grid item xs={12} sm={9} key={link.id}>
                      <Grid container spacing={1}>
                        <Grid item xs={11}>
                          <CustomFormLabel htmlFor={link.label.toLowerCase()}>{link.label.toUpperCase()} *</CustomFormLabel>
                          <CustomTextField
                            id={link.label.toLowerCase()}
                            variant="outlined"
                            fullWidth
                            size="small"
                            onChange={(e) => { updateLinkUrl(e, e.target.value, e.target.id) }}
                            placeholder={link.url}
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              size="small"
                              sx={{ flexShrink: '0', mt: 5 }}
                              onClick={() => {
                                if (social) {
                                  delete social[link.label.toLowerCase()];
                                }
                                dispatch(deleteLink(link.id));
                              }}
                            >
                              <FeatherIcon icon="trash-2" width="16" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={9} sx={{ mt: 1, mb: 2 }}>
                    <Typography variant="button" fontWeight="bold">
                      * only urls are accepted
                    </Typography>
                  </Grid>
                </>
                : null
              }
            </Grid>
            <form id="newForm" >
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5" fontWeight="600" sx={{ mb: 2, mt: 3 }}>
                    Add a personal links
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {validNewLinkTitle ?
                    <CustomTextField
                      fullWidth
                      id="newTitle"
                      variant="outlined"
                      label="Button title"
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={(e) => { addNewLinkTitle(e, e.target.value); }}
                    />
                    :
                    <CustomTextField
                      id="newTitle"
                      variant="outlined"
                      fullWidth
                      label="Button title"
                      size="small"
                      error
                      helperText="No blank title."
                      onChange={(e) => { addNewLinkTitle(e, e.target.value); }}
                    />
                  }
                </Grid>
                <Grid item xs={6}>
                  {validNewLinkUrl ?
                    <CustomTextField
                      fullWidth
                      id="newUrl"
                      variant="outlined"
                      label="Url"
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={(e) => { addNewLinkUrl(e, e.target.value); }}
                    />
                    :
                    <CustomTextField
                      id="newUrl"
                      variant="outlined"
                      fullWidth
                      label="Url"
                      size="small"
                      error
                      helperText="Please enter a valid url."
                      onChange={(e) => { addNewLinkUrl(e, e.target.value); }}
                    />

                  }
                </Grid>
                <Grid item xs={10}>
                  {validNewLinkTitle && validNewLinkUrl ?
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addLink(idLink, newLinkTitle.toLowerCase(), newLinkUrl));
                        setSocial({ ...social, [newLinkTitle.toLowerCase()]: newLinkUrl });
                        setValidNewLinkTitle(false);
                        setValidNewLinkUrl(false);
                        document.getElementById("newForm").reset();
                      }}
                      sx={{ ml: 1 }}
                    >
                      Add personal link
                    </Button>
                    :
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disabled
                      sx={{ ml: 1 }}
                    >
                      Add personal link
                    </Button>

                  }
                </Grid>
              </Grid>
            </form>
            {
              validEmail && validUsername && uniqueUsername ?
                <Button
                  sx={{ mt: 5 }}
                  color="success"
                  variant="contained"
                  onClick={(e) => signUpdate(e)}
                >
                  Update
                </Button>
                :
                <Button
                  sx={{ mt: 3 }}
                  color="success"
                  variant="contained"
                  disabled
                >
                  Update
                </Button>
            }
          </Card>
        </Grid>
      </Grid >
    </PageContainer >
  );
};

export default EditProfile;
