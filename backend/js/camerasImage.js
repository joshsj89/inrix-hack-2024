const sharp = require('sharp');

const getCameraImage = async (token, cameraId) => {
    const url = `https://na-api.beta.inrix.com/Traffic/Inrix.ashx?Action=GetTrafficCameraImage&Token=${token}&CameraID=${cameraId}&DesiredWidth=640&DesiredHeight=480`;

    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
    
        const image = await response.arrayBuffer();
    
        const image2 = await sharp(Buffer.from(image))
            .resize(640, 480)
            .jpeg()
            .toBuffer();
        
        return image2;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = getCameraImage;