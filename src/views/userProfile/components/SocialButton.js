import React from 'react';
import { Fab, Typography } from '@mui/material';

import { FaGlobe, FaTwitter, FaInstagram, FaFacebookF, FaGoogle, FaLinkedinIn, FaTiktok, FaDiscord, FaStackOverflow, FaSpotify, FaAppStore, FaShareAlt, FaGithub, FaGitlab, FaGooglePlay, FaApple, FaAtlassian, FaAmazon, FaDropbox, FaFigma, FaSnapchatGhost, FaStripe, FaTrello, FaTumblr, FaTwitch, FaUnsplash, FaVine, FaWikipediaW, FaWhatsapp, FaYoutube, FaRedditAlien, FaMediumM, FaPinterestP, FaMusic } from "react-icons/fa";

const StyleButton = ({ text, link, bgColor, textColor, icon }) => {
    return (
        <Fab component="a" href={link} target="_blank" size="large" variant="extended" sx={{
            mb: '30px!important',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: bgColor,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            color: textColor,
            '&:hover': {
                backgroundColor: bgColor,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                color: textColor,
            },
        }}>
            {icon}
            <Typography
                fontWeight="500"
                sx={{
                    ml: 1,
                    textTransform: 'capitalize',
                }}
            >
                {text.toUpperCase()}
            </Typography>
        </Fab>
    );
}

const SocialButton = ({ social, type }) => {

    if (social.indexOf("http://") === -1 && social.indexOf("https://") === -1) {
        social = `https://${social}`;
    }

    const socialUrl = social.split("/");
    const socialSplit = socialUrl[2].split(".");
    let socialName = socialSplit[0];
    if (socialName === "www") {
        socialName = socialSplit[1];
    }

    switch (socialName) {

        case 'twitter':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#1DA1F2"
                    textColor="#fff"
                    icon={<FaTwitter size='1.25em' />}
                />
            );

        case 'instagram':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#E1306C"
                    textColor="#fff"
                    icon={<FaInstagram size='1.25em' />}
                />
            );

        case 'facebook':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#4267B2"
                    textColor="#fff"
                    icon={<FaFacebookF size='1.25em' />}
                />
            );

        case 'linkedin':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#004471"
                    textColor="#fff"
                    icon={<FaLinkedinIn size='1.25em' />}
                />
            );

        case 'tiktok':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#000000"
                    textColor="#fff"
                    icon={<FaTiktok size='1.25em' />}
                />
            );

        case 'discord':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#5865F2"
                    textColor="#fff"
                    icon={<FaDiscord size='1.25em' />}
                />
            );

        case 'stackoverflow':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#F48024"
                    textColor="#fff"
                    icon={<FaStackOverflow size='1.25em' />}
                />
            );

        case 'spotify':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#1DB954"
                    textColor="#fff"
                    icon={<FaSpotify size='1.25em' />}
                />
            );

        case 'apps':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#007bff"
                    textColor="#fff"
                    icon={<FaAppStore size='1.25em' />}
                />
            );

        case 'apple':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#000000"
                    textColor="#fff"
                    icon={<FaApple size='1.25em' />}
                />
            );

        case 'github':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#171515"
                    textColor="#fff"
                    icon={<FaGithub size='1.25em' />}
                />
            );

        case 'gitlab':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#FC6D27"
                    textColor="#fff"
                    icon={<FaGitlab size='1.25em' />}
                />
            );

        case 'google':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#F4B400"
                    textColor="#fff"
                    icon={<FaGoogle size='1.25em' />}
                />
            );

        case 'play':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#00E575"
                    textColor="#fff"
                    icon={<FaGooglePlay size='1.25em' />}
                />
            );

        case 'atlassian':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#0052CC"
                    textColor="#fff"
                    icon={<FaAtlassian size='1.25em' />}
                />
            );

        case 'youtube':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#FF0000"
                    textColor="#fff"
                    icon={<FaYoutube size='1.25em' />}
                />
            );

        case 'twitch':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#6441A5"
                    textColor="#fff"
                    icon={<FaTwitch size='1.25em' />}
                />
            );

        case 'reddit':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#FF4500"
                    textColor="#fff"
                    icon={<FaRedditAlien size='1.25em' />}
                />
            );

        case 'medium':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#00B8D4"
                    textColor="#fff"
                    icon={<FaMediumM size='1.25em' />}
                />
            );

        case 'tumblr':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#35465C"
                    textColor="#fff"
                    icon={<FaTumblr size='1.25em' />}
                />
            );

        case 'unsplash':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#000000"
                    textColor="#fff"
                    icon={<FaUnsplash size='1.25em' />}
                />
            );

        case 'vine':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#00B488"
                    textColor="#fff"
                    icon={<FaVine size='1.25em' />}
                />
            );

        case 'amazon':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#FF9900"
                    textColor="#fff"
                    icon={<FaAmazon size='1.25em' />}
                />
            );

        case 'pinterest':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#BD081C"
                    textColor="#fff"
                    icon={<FaPinterestP size='1.25em' />}
                />
            );

        case 'figma':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#006400"
                    textColor="#fff"
                    icon={<FaFigma size='1.25em' />}
                />
            );

        case 'snapchat':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#FFFC00"
                    textColor="#fff"
                    icon={<FaSnapchatGhost size='1.25em' />}
                />
            );

        case ' trello':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#0079BF"
                    textColor="#fff"
                    icon={<FaTrello size='1.25em' />}
                />
            );

        case 'wa':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#25D366"
                    textColor="#fff"
                    icon={<FaWhatsapp size='1.25em' />}
                />
            );

        case 'wikipedia':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#000000"
                    textColor="#fff"
                    icon={<FaWikipediaW size='1.25em' />}
                />
            );
        
        case 'dropbox':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#007EE5"
                    textColor="#fff"
                    icon={<FaDropbox size='1.25em' />}
                />
            );

        case 'stripe':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#5433FF"
                    textColor="#fff"
                    icon={<FaStripe size='1.25em' />}
                />
            );

        case 'music':
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#D60017"
                    textColor="#fff"
                    icon={<FaMusic size='1.25em' />}
                />
            );

        default:
            return (
                <StyleButton
                    text={type}
                    link={social}
                    bgColor="#7352ff"
                    textColor="#fff"
                    icon={<FaShareAlt size='1.25em' />}
                />
            )
    }
}

export default SocialButton;