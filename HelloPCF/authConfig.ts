import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "5d442b28-b1ff-49bc-b51a-a2c5b7e122df", //msaljs-v2-test    //"3fba556e-5d4a-48e3-8e1a-fd57c12cb82e",
        authority: "https://login.microsoftonline.com/common", //"https://login.windows-ppe.net/common",
        redirectUri: "https://apps.powerapps.com/play/1350c8cc-a612-4041-bfd6-907a77b07350?tenantId=044f7a81-1422-4b3d-8f68-3001456e6406",
        postLogoutRedirectUri: "/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
