const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getKGData } = require('./knowledgeGraph');
// const { distribution, pulseDist, getRandValue } = require('./helper');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json())

// enabling CORS for some specific origins only. 
const corsOptions = { 
    origin : ['http://localhost:8080'], 
 };

app.post('/getSongDesc', cors(corsOptions), (req, res) => {
    console.log('get a knowledge graph endpoint');
    console.log(typeof req.body.bmp);
    let bmp = Number(req.body.bmp.toString().slice(0,-1)+'0');
    console.log(bmp);

    
        // let randBMP = getRandValue(distribution, pulseDist);
        // console.log(randBMP);
    getKGData(bmp)
        .then((songInfo) => {
            console.log(songInfo);
            res.json({ uri: songInfo[0]['songURI'].value });
        });
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send('Hello from response');
});

app.get('/thingDescription', (req, res) => {
    const thingDesc  = {
        name: "RandomValueGenerator",
        description: "A simple server provides random values from precomputed normal distribution.",
        endpoints: {
            "/getRandPulse": {
                description: "It generates and returns a random value from a precomputed normal distribution.",
                // parameters: {
                //     mean: "The mean value of the normal distribution.", 
                //     std: "THe standard deviation of the normal distribution.",
                //     size: "The size of the generated normal distribution."
                // },
                exampleRequest:"/getRandPulse",
                exampleResponse: {
                    randomValue: 1
                }
            }
        }
    };
    res.json(thingDesc);
});

app.listen(PORT, () => {
    console.log(`emulator's server is running on port ${PORT}`);
});