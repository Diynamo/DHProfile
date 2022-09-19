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

import Breadcrumb from '../../layouts/blank-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

import { ReactComponent as LogoDark } from '../../assets/images/logos/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../assets/images/logos/logo-white.svg';

import { ReactComponent as SwappyDark } from '../../assets/images/logos/pbs-dark.svg';
import { ReactComponent as SwappyLight } from '../../assets/images/logos/pbs-white.svg';

import img1 from '../../assets/images/users/profile.png';
import { getUser } from '../../server/users';
import { getTxHash, getTxId } from '../../server/tx';

import Footer from '../../layouts/full-layout/footer/Footer';

function getQty(x) {

    const detail = x.split(';');
    const qty = detail[2];

    return qty;
}

function getAddress(x) {

    const detail = x.split(';');
    const address = detail[1];

    return address;
}

function getDate(x) {

    const date = moment.unix(x).format("MM/DD/YYYY");

    return date;
}

function getTotal(x) {

    return parseFloat(x) / 100
}

const BlankTX = ({ id, hash }) => {

    const customizer = useSelector((state) => state.CustomizerReducer);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loadUser, setLoadUser] = useState(false);

    const [tx, setTx] = useState(null);
    const [user, setUser] = useState(null);

    /*
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectStatus = urlParams.get('redirect_status');
    */

    useEffect(() => {
        getTxId(id).then(res => {
            getUser(res.address).then(r => {
                setUser(r);
                setLoadUser(true);
                setLoading(true);
            }).catch(() => {
                setLoading(true);
            });
            setTx(res);
        }).catch(() => {
            setError(true);
            setLoading(true);
        })
    }, []);

    return (
        <PageContainer title="Dream Hunters | Invoice" description="Cristiano Invoice of the Dream Hunters collection.">
            {/* breadcrumb */}
            <Breadcrumb />
            {/* end breadcrumb */}
            <Card sx={{
                mt: 12,
            }}>
                {
                    loading && !error ?
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
                                        <Typography variant="body2" noWrap>{tx._id}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} sx={{ mt: 1 }}>
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="h5">Timestamp</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={8}>
                                        <Typography variant="body2">{tx.timestamp}</Typography>
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
                                                        src={loadUser && (user.profilePic !== null) ? user.profilePic : img1}
                                                        alt={tx.address}
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
                                                            {loadUser && (user.username !== null) ? user.username : tx.address}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    {tx.qty}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    $ 3.00
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h6">{getDate(tx.timestamp)}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    sx={{
                                                        backgroundColor:
                                                            tx.status === 'succeeded'
                                                                ? (theme) => theme.palette.success.light
                                                                : (theme) => theme.palette.error.light,
                                                        color:
                                                            tx.status === 'succeeded'
                                                                ? (theme) => theme.palette.success.main
                                                                : (theme) => theme.palette.error.main,
                                                        borderRadius: '6px',
                                                        pl: '3px',
                                                        pr: '3px',
                                                    }}
                                                    size="small"
                                                    label={tx.status}
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
                                        <Typography variant="body1">$ {getTotal(tx.amount)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            { /* method === '0' ?
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
                                */
                            }

                        </CardContent>

                        : loading && error ?

                            <CardContent>
                                <Box>
                                    <Typography variant="h3">ERRORE ⏳</Typography>

                                    <Typography variant="body1" color="textSecondary">
                                        Wait for the transaction to complete before viewing your invoice.
                                    </Typography>
                                </Box>
                            </CardContent>
                            :
                            <CardContent>
                                <Box>
                                    <Typography variant="h3">Your invoice is being uploaded ⏳</Typography>

                                    <Typography variant="body1" color="textSecondary">
                                        Wait for the transaction to complete before viewing your invoice.
                                    </Typography>
                                </Box>
                            </CardContent>
                }
            </Card>
            <Footer />
        </PageContainer >
    );
}

export default BlankTX;