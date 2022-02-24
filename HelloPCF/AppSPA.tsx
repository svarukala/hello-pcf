//import { useHistory } from "react-router-dom";
// Material-UI imports
import Grid from "@material-ui/core/Grid";
// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication, InteractionRequiredAuthError, AccountInfo, InteractionType } from "@azure/msal-browser";
import { CustomNavigationClient } from "./utils/NavigationClient";


import Typography from "@material-ui/core/Typography";
import WelcomeName from "./ui-components/WelcomeName";
import SignInSignOutButton from "./ui-components/SignInSignOutButton";

import { useMsal, useAccount, useIsAuthenticated, MsalAuthenticationTemplate } from "@azure/msal-react";
import { useEffect, useState } from "react";

import { loginRequest } from "./authConfig";
import { InteractionStatus } from "@azure/msal-browser";

// Sample app imports
import { ProfileData, GraphData } from "./ui-components/ProfileData";
import { Loading } from "./ui-components/Loading";
import { ErrorComponent } from "./ui-components/ErrorComponent";
import { callMsGraph } from "./utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@material-ui/core/Paper";

import React = require("react");

type AppProps = {
    pca: IPublicClientApplication
};



const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState<null|GraphData>(null);


    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph().then(response => setGraphData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount() as AccountInfo
                    });
                }
            });
        }
    }, [inProgress, graphData, instance]);
  
    return (
        <Paper>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </Paper>
    );
};



function AppSPA({ pca }: AppProps) {
    // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
    //const history = useHistory();
    //const navigationClient = new CustomNavigationClient(history);
    //pca.setNavigationClient(navigationClient);
  
    const { accounts, inProgress, instance } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [name, setName] = useState("");
    
    const isAuthenticated = useIsAuthenticated();

    const authRequest = {
        ...loginRequest
    };

    useEffect(() => {
        if (account && account.name) {
            setName(account.name.split(" ")[0]);
        } else {
            setName("");
        }
    }, [account]);

    return (
      <MsalProvider instance={pca}>
              
            <Typography variant="h5" align="center">Welcome to the Microsoft Authentication Library For React Quickstart</Typography>
            <br/>
            <br/>
            <Grid container justifyContent="center">
                <WelcomeName />
                <SignInSignOutButton />
            </Grid>

            <br/>
            <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
            >
            <ProfileContent />
        </MsalAuthenticationTemplate>

      </MsalProvider>
    );
}
  


export default AppSPA;
