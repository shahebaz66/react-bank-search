import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import './table.css'


export default function BasicTable() {
    const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    // function createData(ifsc, bank_id, branch, address, city, district, state, bank_name) {
    //     return { ifsc, bank_id, branch, address, city, district, state, bank_name };
    // }


    var [state, setState] = useState([]);
    var [initialState, setinitialState] = useState([]);
    var [page, setPage] = useState(5);
    var [value, setValue] = useState(0);
    useEffect(() => {
        async function newData() {
            const result = await axios(
                'http://vast-shore-74260.herokuapp.com/banks?city=MUMBAI',
            );

            setinitialState(result.data)
            setState(result.data)
        }
        newData()
    }, []);
    const classes = useStyles();
    const change = (e) => {

        var search = e.target.value;
        var condition = new RegExp(search);

        var table = initialState
        console.log(table.length);

        var result = table.filter(function (el) {
            return condition.test([el.ifsc, el.bank_id, el.branch, el.address, el.city, el.district, el.state, el.bank_name]);
        });

        setState(result)
    }
    const handleChange = (event) => {
        setPage(event.target.value)

    };
    return (
        <div>
            <div className={'head'}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    // value={page}
                    // onChange={handleChange}
                    >
                        <MenuItem value={'10'}>Ten</MenuItem>
                        <MenuItem value={'20'}>Twenty</MenuItem>
                        <MenuItem value={'30'}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <input onChange={(e) => change(e)} />
            </div>
            <div style={{ marginLeft: '50px' }}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Items Per Page</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={page}
                        onChange={handleChange}
                    >

                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={15}>Fifeteen</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={'table'}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ifsc</TableCell>
                                <TableCell align="right">bank_id</TableCell>
                                <TableCell align="right">branch</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">city</TableCell>
                                <TableCell align="right">district</TableCell>
                                <TableCell align="right">state</TableCell>
                                <TableCell align="right">bank_name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.slice(value * page, page * (value + 1)).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.ifsc}
                                    </TableCell>
                                    <TableCell align="right">{row.bank_id}</TableCell>
                                    <TableCell align="right">{row.branch}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">{row.district}</TableCell>
                                    <TableCell align="right">{row.state}</TableCell>
                                    <TableCell align="right">{row.bank_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

