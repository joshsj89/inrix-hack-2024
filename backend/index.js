const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const getCameraImage = require('./js/camerasImage');
const { getCamerasInABox, getCamerasInRadius } = require('./js/camerasBox');

const app = express();
const port = 5000;

let reqToServe = 0 

app.use(bodyParser.json());
app.use(cors());

let currentToken = '';

// Gets the token
const getToken = async () => {
    let token;
    const expiration = new Date(currentToken.expires);
    const now = new Date();


    // Check if the token is still valid
    if (currentToken && expiration > now) {
        
        token = currentToken.token;
        // console.log("New token: ", token);
    } else {
        try {
            const response = await fetch('http://54.185.251.100:5000/token'); // change localhost later
            const data = await response.json();

            token = data.token;
            // console.log("New token: ", token);
        } catch (error) {
            console.error(error);
        }
    }

    return token;
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


// Finalized endpoint for the frontend
app.get('/camera-request', async(req, res) => {
    reqToServe = (reqToServe + 1) % 10000;
    const thisReq = reqToServe;
    const token = await getToken();

    let allData = [];

    // force-stop requests that aren't the current request to serve
    // live-updated as requests come in
    if (thisReq != reqToServe){
        // console.log("STOPPING REQUEST " + thisReq);
        allData = ["STOP"];
        res.json(allData);
        return;
    }

    // GetCamerasInBox portion
    const corner1 = req.query.corner1;
    const corner2 = req.query.corner2;

    if (!token){
        res.json({ error: "Invalid token. " });
    }

    if (!corner1 || !corner2) {
        res.json({ error: "Token or geobox corners not found. Please provide." });
    }
    const cameras = await getCamerasInABox(token, corner1, corner2);
    // console.log(cameras);

    // GetCameraImage portion    
    if (cameras == null) {
        res.json(allData);
        return;
    }

    for (const camera of cameras) {
        // force-stop requests that aren't the current request to serve
        // live-updated as requests come in
        if (thisReq != reqToServe){
            // console.log("STOPPING REQUEST " + thisReq);
            allData = ["STOP"];
            res.json(allData);
            return;
        }
        const cameraId = camera.id;
    
        if (!token || !cameraId) {
            res.json({ error: "Camera ID or token not found. Please provide." });
            return;
        }

        let response;
        let data;
        let image;
        
        try {
            image = await getCameraImage(token, cameraId);

            // send request to 127.0.0.1:3000/bedrock-req img = image
            response = await fetch("http://54.185.251.100:5001/bedrock-req", {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
                body: image
            });

            // console.log(response);
            data = await response.json();
            // console.log(typeof data, data);

        } catch (error) {
            console.log(error);
            data = { error: 'Non-JSON response received', is_there_trash: false };
        }

        if (data.is_there_trash === true) {
            // console.log("Adding an entry with trash!")
            const image64 = `data:image/jpeg;base64,${image.toString('base64')}`;

            allData.push({
                key: camera.key,
                name: camera.name,
                location: {
                    lat: parseFloat(camera.latitude),
                    lng: parseFloat(camera.longitude)
                },
                trash: data,
                camPicture: image64
            });    
        }
    }
    // console.log("Camera processing complete");
    res.json(allData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});