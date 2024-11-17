const express = require('express');

const app = express();
const port = 5000;

app.get('/token', async (req, res) => {
    let url = `https://na-api.beta.inrix.com/Traffic/Inrix.ashx?Action=GetSecurityToken&vendorId=1680049421&consumerId=3466e4ef-329b-474f-b52b-a3818e9df6b6&format=json`; //

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
})