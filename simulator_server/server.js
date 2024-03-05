const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

/*
CORS - Cross-Origin Resource Sharing 
is required to allow a front-end client to make request to TD
Using a node.js package - CORS for middleware in express
*/
const corsOptions = { 
    origin : ['http://localhost:8080'], 
 };

app.get('/', (req, res) => {
    console.log('hello');
    res.send('Hello from response');
});

app.get('/thingDescription', cors(corsOptions), (req, res) => {
    const thingDesc  = 
    {
        "@context": 
            "https://www.w3.org/2022/wot/td/v1.1"
        ,
        "id": "urn:uuid:300f4c4b-ca6b-484a-88cf-fd5224a9a61d",
        "title": "Heart Rate Monitor",
        "@type": "saref:LightSwitch",
        "securityDefinitions": { "nosec_sc": { "scheme": "nosec" }},
        "security": "nosec_sc",
        "properties": {},
        "actions": {},
        "events": {
            "currentHeartRate": {
                "data": {"type": "object"},
                "forms": [{
                    "href": "http://localhost:3001/currentBPM"
                }]
            }
        }
    }
    return res.json(thingDesc);
});

let randBMP = 60;
let isFirstRun = true;

function randomInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get Random number which has a trend to increase
function getNextHeartRate(currentBMP) {
    let nextBMP = currentBMP + randomInt(15) - randomInt(8);
    if (nextBMP < 50) {
        nextBMP += randomInt(30);
    } else if (nextBMP > 200) {
        nextBMP -= randomInt(30);
    }
    return nextBMP;
}

/*  it handles HTTP GET request with a `/currentBPM`
    returns a generated random heartbeat value as `randBMP`
    every 5 seconds except the first run
    by calling a function `getNextHeartRate` 
*/
app.get('/currentBPM', async function (req, res) {
    if (!isFirstRun) await sleep(5000);
    randBMP = getNextHeartRate(randBMP);
    isFirstRun = false;
    res.json({randBMP});
});

app.listen(PORT, () => {
    console.log(`emulator's server is running on port ${PORT}`);
});