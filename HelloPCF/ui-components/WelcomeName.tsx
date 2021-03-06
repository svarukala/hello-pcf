import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import Typography from "@material-ui/core/Typography";
import React = require("react");

const WelcomeName = () => {
    const { accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [name, setName] = useState("");

    useEffect(() => {
        if (account && account.name) {
            setName(account.name.split(" ")[0]);
        } else {
            setName("");
        }
    }, [account]);

    if (name) {
        return <Typography variant="h6">Welcome, {name}</Typography>;
    } else {
        return null;
    }
};

export default WelcomeName;