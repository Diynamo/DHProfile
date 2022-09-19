import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
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
    TablePagination,
    TableRow,
    TableFooter,
    IconButton,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const TransactionTable = ({ rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Typography fontWeight="500" variant="h3" textAlign="center" mt={2}>
                Dream Validated Transactions
            </Typography>
            <CardContent>
                <Box
                    sx={{
                        overflow: {
                            xs: 'auto',
                            sm: 'unset',
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
                                    <Typography variant="h5">Hash</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h5">Dream</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h5">Qty.</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h5">Total</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h5">Method</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h5">Status</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.hash}>
                                    <TableCell>
                                        <a href={`/tx/${row.hash}`} style={{ color: "#216bd6" }}>
                                            {row.hash}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                src={row.imgsrc}
                                                alt={row.imgsrc}
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
                                                    {row.dream}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                            {row.qty}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                            $ {row.total}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                            {row.method}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                backgroundColor:
                                                    row.status === 'Completed'
                                                        ? (theme) => theme.palette.success.light
                                                        : row.status === 'Pending'
                                                            ? (theme) => theme.palette.warning.light
                                                            : row.status === 'Cancel'
                                                                ? (theme) => theme.palette.error.light
                                                                : (theme) => theme.palette.secondary.light,
                                                color:
                                                    row.status === 'Completed'
                                                        ? (theme) => theme.palette.success.main
                                                        : row.status === 'Pending'
                                                            ? (theme) => theme.palette.warning.main
                                                            : row.status === 'Cancel'
                                                                ? (theme) => theme.palette.error.main
                                                                : (theme) => theme.palette.secondary.main,
                                                borderRadius: '6px',
                                                pl: '3px',
                                                pr: '3px',
                                            }}
                                            size="small"
                                            label={row.status}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={6}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputprops: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TransactionTable;
