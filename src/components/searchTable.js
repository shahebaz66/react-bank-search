import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBDataTable, MDBInput } from 'mdbreact';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const DatatablePage = (props) => {
    const useStyles = makeStyles((theme) => ({

        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const handleChange = (event) => {
        props.setcity(event.target.value)

    };
    const classes = useStyles();

    return (

        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">CITY</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.city}
                    onChange={handleChange}
                >
                    <MenuItem value={'DELHI'}>DELHI</MenuItem>
                    <MenuItem value={'HYDERABAD'}>HYDERABAD</MenuItem>
                    <MenuItem value={'BANGALORE'}>BANGALORE</MenuItem>
                    <MenuItem value={'CHENNAI'}>CHENNAI</MenuItem>
                    <MenuItem value={'GOA'}>GOA</MenuItem>
                    <MenuItem value={'MUMBAI'}>MUMBAI</MenuItem>
                </Select>
            </FormControl>
            <MDBDataTable
                striped
                bordered
                small
                data={props.state}
            />
        </div >
    );
}

export default DatatablePage;