const ImageKit = require("imagekit");

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) { 

    try {
        const result = await imageKit.upload({
            file: file, 
            fileName: fileName, 
            folder: "yt-complete-backend-music"
        });

        return result;

    } catch (error) {
        console.log("ImageKit Upload Error:", error);
        throw error; 
    }
}

module.exports = { uploadFile };