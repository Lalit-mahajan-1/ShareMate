import React from 'react'
import { useState, useEffect, useContext } from "react";
import { createTheme } from '@mui/material/styles';
import './ThemeSelector.css'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import { red,blue,green,purple} from '@mui/material/colors';
const Themeselector = ({onColorChange}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = createTheme({
        palette: {
            main: {
                main: red[50],
            },
            secondary: {
                main: blue[50],
            },
            info: {
                main: purple[50],
            },
            success: {
                main: green[50],
            },
        },
    });
    function handlebackgroundTheme(color){
         onColorChange(color)
         handleClose()
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Select
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="parent">
                    <div className="child" style={{ backgroundColor: theme.palette.main.main }} onClick={() => handlebackgroundTheme(theme.palette.main.main)}></div>
                    <div className="child" style={{ backgroundColor: theme.palette.success.main }} onClick={() => handlebackgroundTheme(theme.palette.success.main)}></div>
                    <div className="child" style={{ backgroundColor: theme.palette.secondary.main }} onClick={() => handlebackgroundTheme(theme.palette.secondary.main)}></div>
                    <div className="child" style={{ backgroundColor: theme.palette.info.main }} onClick={() => handlebackgroundTheme(theme.palette.info.main)}></div>
                </div>
            </Popover>
        </div>
    )
}

export default Themeselector
