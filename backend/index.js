const express = require('express');
const bodyParser = require('body-parser');
const getCameraImage = require('./js/camerasImage');
const { getCamerasInABox, getCamerasInRadius } = require('./js/camerasBox');

const app = express();
const port = 5000;

app.use(bodyParser.json());

let currentToken = '';

// Gets/refreshes the token
const getToken = async (req, res, next) => {
    const expiration = new Date(currentToken.expires);
    const now = new Date();

    // Check if the token is still valid
    if (currentToken && expiration > now) {
        
        res.locals.token = currentToken.token;
        next();
    } else {
        try {
            const response = await fetch('http://localhost:5000/token'); // change localhost later
            const data = await response.json();

            res.locals.token = data.token;
            next();
            // return data.token;
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

// Example URL: localhost:3000/cameras?token=TOKEN&corner1=LAT|LONG&corner2=LAT|LONG
app.get('/cameras', getToken, async (req, res) => {
    const token = res.locals.token;
    const corner1 = req.query.corner1;
    const corner2 = req.query.corner2;

    if (!token || !corner1 || !corner2) {
        res.json({ error: "Token or geobox corners not found. Please provide." });
    }
    const cameras = getCamerasInABox(token, corner1, corner2);
    res.json({ cameras });
});

// Example URL: localhost:3000/camera-image?camera_id=CAMERA_ID&token=TOKEN
app.get('/camera-image', getToken, async (req, res) => {
    const token = res.locals.token;
    const cameraId = req.query.camera_id;

    if (!token || !cameraId) {
        res.json({ error: "Camera ID or token not found. Please provide." });
        return;
    }

    const image = await getCameraImage(token, cameraId);

    // res.json({ image });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
});

// Example URL: localhost:3000/cameras-radius?token=TOKEN&center=LAT|LONG&radius=RAD
app.get('/cameras-radius', getToken, async (req, res) => {
    const token = res.locals.token;
    const center = req.query.center;
    const radius = req.query.radius;

    if (!token || !center || !radius) {
        res.json({ error: "Token or geobox params not found. Please provide." });
    }

    const cameras = getCamerasInRadius(token, center, radius);

    res.json({ cameras });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});