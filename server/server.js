const express = require('express');
const cors = require('cors');
const { distribution, pulseDist, getRandValue } = require('./helper');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

// enabling CORS for some specific origins only. 
const corsOptions = { 
    origin : ['http://localhost:8080'], 
 };

app.get('/getRandPulse', cors(corsOptions), (req, res) => {
    console.log('get a heart beat value');
    let randBMP = getRandValue(distribution, pulseDist);
    console.log(randBMP);

    
    return res.json({ randBMP });
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