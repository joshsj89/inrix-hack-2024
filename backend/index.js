const express = require('express');

const app = express();
const port = 5000;

let currentToken = '';

// Gets/refreshes the token
const getToken = async () => {
    const expiration = new Date(currentToken.expires);
    const now = new Date();

    // Check if the token is still valid
    if (currentToken && expiration > now) {
        return currentToken.token;
    } else {
        try {
            const response = await fetch('http://localhost:5000/token'); // change localhost later
            const data = await response.json();
    
            currentToken = data;
            return data.token;
        } catch (error) {
            console.error(error);
        }
    }
}

app.get('/token', async (req, res) => {
    const url = `https://na-api.beta.inrix.com/Traffic/Inrix.ashx?Action=GetSecurityToken&vendorId=1680049421&consumerId=3466e4ef-329b-474f-b52b-a3818e9df6b6&format=json`;

    const options = {
        method: 'GET'
    };

    const response = await fetch(url, options);
    const data = await response.json();

    res.json({ 
        token: data.result.token,
        expires: data.result.tokenExpireDtUtc
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});