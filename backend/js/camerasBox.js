const xml2js = require('xml2js');

const getCameraInfo = async (xml) => {
    const cameras = [];

    const cameraList = xml.Inrix.Cameras[0].Camera;

    if (cameraList) {
        cameraList.forEach((camera, index) => {
            const key = index + 1;
            const cameraId = camera.$.id;
            const name = camera.Name;
            const point = camera.Point[0];
            const latitude = point.$.latitude;
            const longitude = point.$.longitude;

            cameras.push({ id: cameraId, latitude, longitude, name, key });
        })
    }

    return cameras;
}

const getCamerasInABox = async (token, corner1, corner2) => {
    // Assumes corner1 and corner2 are strings in the format "latitude|longitude"
    // corner1 = "47.636521|-122.321498"
    // corner2 = "47.648940|-122.280300"
    const url = `https://na-api.beta.inrix.com/Traffic/Inrix.ashx?action=GetTrafficCamerasInBox&locale=en-US&corner1=${corner1}&corner2=${corner2}&token=${token}`;

    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const responseText = await response.text();
        const root = await xml2js.parseStringPromise(responseText);
    
        const cameraInfo = await getCameraInfo(root);
    
        return cameraInfo;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getCamerasInRadius = async (token, center, radius) => {
    // Assumes center is in the format "latitude|longitude"
    // center = "47.636521|-122.321498"
    // radius = 200


    const url = `https://na-api.beta.inrix.com/Traffic/Inrix.ashx?action=GetTrafficCamerasInRadius&locale=en-US&center=${center}&radius=${radius}&token=${token}`;

    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const responseText = await response.text();
        const root = await xml2js.parseStringPromise(responseText);

        const cameraInfo = await getCameraInfo(root);

        return cameraInfo;

    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { getCamerasInABox, getCamerasInRadius };