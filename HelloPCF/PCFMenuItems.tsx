import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import React = require("react");

export const PCFMenuItems = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = true;//Boolean(anchorEl);

    
    return (
        <div>
            <Button>Click Me!</Button>
            <Menu
                id="menu-appbar"
                keepMounted
                open={open}
            >
                <MenuItem  key="loginPopup">Sign in using Popup</MenuItem>
                <MenuItem  key="loginRedirect">Sign in using Redirect</MenuItem>
            </Menu>
        </div>
    )
};