import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TableHead,
    Avatar,
    Chip,
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Divider,
} from '@mui/material';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

import { ReactComponent as LogoDark } from '../../assets/images/logos/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../assets/images/logos/logo-white.svg';

import { ReactComponent as SwappyDark } from '../../assets/images/logos/pbs-dark.svg';
import { ReactComponent as SwappyLight } from '../../assets/images/logos/pbs-white.svg';

import img1 from '../../assets/images/users/profile.png';
import { getTransH, getWhitelist, newTransaction, newWhitelist, setWhitelist } from '../../server/cristianoWhitelist';
import { setCristianoCards } from '../../server/cristianoCards';
import { getUser } from '../../server/users';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Private Sale',
    },
    {
        title: 'Invoice',
    },
];

const Invoice = () => {
    const customizer = useSelector((state) => state.CustomizerReducer);

    const [username, setUsername] = useState(null);
    const [userImg, setUserImg] = useState(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const token = urlParams.get('token') === process.env.REACT_APP_INVOICE_API_CODE ? true : false;
    const hash = urlParams.get('hash');
    const timestamp = urlParams.get('timestamp');
    const date = moment.unix(timestamp).format("MM/DD/YYYY");
    const qty = urlParams.get('qty');
    const total = urlParams.get('total');
    const address = urlParams.get('address');
    const status = urlParams.get('status') === '0' ? 'Completed' : urlParams.get('status') === '1' ? 'Failed' : urlParams.get('status') === '2' ? 'Cancelled' : 'Unknown';
    const statusF = urlParams.get('status')
    const method = urlParams.get('method');

    useEffect(() => {
        getTransH(hash).then((res) => {
            if (res === true) {
                if (token && hash && timestamp && qty && total && address && status && method) {
                    newTransaction(hash, address, qty, total, timestamp, statusF, method).then((result) => {
                        if (statusF === '0' && result) {
                            getWhitelist(address).then((r) => {
                                if (r.total === 0) {
                                    newWhitelist(address, qty, timestamp, true)
                                    setCristianoCards(qty, timestamp)
                                } else if (r.total < 10) {
                                    const newTotal = r.total + parseFloat(qty);
                                    const newTransactionCount = r.transaction + 1;
                                    setWhitelist(address, qty, newTotal, timestamp, newTransactionCount)
                                    setCristianoCards(qty, timestamp)
                                }
                            })
                        }
                    });
                }
            }
        });

        getUser(address).then((res) => {
            if (res !== null) {
                setUsername(res.username)
                setUserImg(res.profilePic)
            }
        })

    }, []);

    return (
        <PageContainer title="Dream Hunters | Invoice" description="Cristiano Invoice of the Dream Hunters collection.">
            {/* breadcrumb */}
            <Breadcrumb title="Invoice of Cristiano" items={BCrumb} />
            {/* end breadcrumb */}
            <Card>
                {
                    token ?
                        <CardContent>
                            <Divider><h3>Dream Hunters</h3></Divider>
                            <Box
                                sx={{
                                    mt: 4,
                                    textAlign: 'center',
                                }}
                            >
                                {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />}
                            </Box>
                            <Box sx={{
                                pt: 2,
                                pb: 4,
                                textAlign: 'justify',
                            }}>
                                <Grid container spacing={0} sx={{ mt: 4 }}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="h5">Transaction Hash</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="body2" noWrap>{hash}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} sx={{ mt: 1 }}>
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="h5">Timestamp</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={8}>
                                        <Typography variant="body2">{timestamp}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box
                                sx={{
                                    overflow: {
                                        xs: 'auto',
                                        md: 'unset',
                                    },
                                }}
                            >
                                <Table
                                    aria-label="custom pagination table"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h5">Customer</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">Items</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">Price</Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h5">Date</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">Status</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar
                                                        src={userImg ? userImg : img1}
                                                        alt={address}
                                                        width="30"
                                                        sx={{
                                                            borderRadius: '100%',
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            ml: 2,
                                                        }}
                                                    >
                                                        <Typography variant="h6" fontWeight="600">
                                                            {username ? username : address}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    {qty}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    $ 3.00
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h6">{date}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    sx={{
                                                        backgroundColor:
                                                            status === 'Completed'
                                                                ? (theme) => theme.palette.success.light
                                                                : status === 'Failed'
                                                                    ? (theme) => theme.palette.error.light
                                                                    : status === 'Cancelled'
                                                                        ? (theme) => theme.palette.warning.light
                                                                        : (theme) => theme.palette.secondary.light,
                                                        color:
                                                            status === 'Completed'
                                                                ? (theme) => theme.palette.success.main
                                                                : status === 'Failed'
                                                                    ? (theme) => theme.palette.error.main
                                                                    : status === 'Cancelled'
                                                                        ? (theme) => theme.palette.warning.main
                                                                        : (theme) => theme.palette.secondary.main,
                                                        borderRadius: '6px',
                                                        pl: '3px',
                                                        pr: '3px',
                                                    }}
                                                    size="small"
                                                    label={status}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>

                            <Box sx={{
                                pt: 2,
                                pb: 4,
                                textAlign: 'justify',
                            }}>
                                <Grid container spacing={0} sx={{ mt: 4 }}>
                                    <Grid item xs={6} sm={8} textAlign="end" alignSelf="flex-end">
                                        <Typography variant="h3">Total</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={4} textAlign="end" alignSelf="flex-end">
                                        <Typography variant="body1">$ {total}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {method === '0' ?
                                <Box
                                    sx={{
                                        mt: 1,
                                        textAlign: 'end',
                                    }}
                                >
                                    {customizer.activeMode === 'dark' ? <SwappyLight width="150px" /> : <SwappyDark width="150px" />}
                                </Box>
                                :
                                null
                            }

                        </CardContent>
                        :
                        <CardContent>
                            <Box>
                                <Typography variant="h3">Something went wrong 🤕</Typography>

                                <Typography variant="body1" color="textSecondary">
                                    Sorry, but something went wrong. Contact us as soon as possible.
                                </Typography>
                            </Box>
                        </CardContent>
                }
            </Card>
        </PageContainer >
    );
}

export default Invoice;