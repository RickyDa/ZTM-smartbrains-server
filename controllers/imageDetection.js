const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'YOUR CLARIFAI API'
});


const getFaceLocations = (data) => {
    const outputs = data.outputs[0].data.regions
    return outputs.map((output) => output.region_info.bounding_box)
}

const detect = async (req, res) => {
    const { imageUrl } = req.body;
    try {
        const clarifaiRes = await app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl);
        const boxes = getFaceLocations(clarifaiRes);
        if (boxes.length)
            res.json(boxes);
        else
            res.json("There are no face on the image");
    } catch (err) {
        console.log(err);
        res.status(400).json("Clarifai responded with err");
    }
}

module.exports = { detect };

