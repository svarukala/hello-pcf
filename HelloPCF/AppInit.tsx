import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { msalConfig, loginRequest } from "./authConfig";
import * as React from "react";
import { PCFMenuItems } from "./PCFMenuItems";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";

import AppSPA from './AppSPA';
import ReactDOM = require("react-dom");

export const msalInstance = new PublicClientApplication(msalConfig);
// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
	msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
		const payload = event.payload as AuthenticationResult;
		const account = payload.account;
		msalInstance.setActiveAccount(account);
	}
});


function AppInit() {
    
    return (
        <div>
            <AppSPA pca={msalInstance} />
        </div>
    );
}
  


export default AppInit;
