const express = require('express');
const cors = require('cors');
const { distribution, pulseDist, getRandValue, genNormDistrib, distribDiv, pulseDistDiv } = require('./helper');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// enabling CORS for some specific origins only. 
const corsOptions = { 
    origin : ['http://localhost:8080'], 
 };

app.get('/', (req, res) => {
    console.log('hello');
    res.send('Hello from response');
});

app.get('/thingDescription', (req, res) => {
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
    //     "@context": "http://www.w3.org/2022/wot/td/v1.1",
    //     "title": "Heart Rate Monitor",
    //     "properties": {
    //         "randBPM": {
    //             "type": "string",
    //         }
    //     },
    //     "events": {
    //         "currentHeartRate": {
    //             "data": {"type": "integer"},
    //             "forms": [{
    //                 "href": `http://localhost:3000/currentBPM`,
    //                 "subprotocol": "longpoll",
    //                 // "contentType": "application/json"
    //             }]
    //         }
    //     }
    // };
    return res.json(thingDesc);
});

let randBMP = 60;

function randomInt(maxInt) {
    return Math.floor(Math.random()*maxInt);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 60 -> 65 -> 70 -> 80 -> ... -> 180 -> 120 -> 50 -> 60 -> ...
// Get Random nr between -5 and 5

function getRandomNr(currentBMP){
    
    let nextBMP = currentBMP + randomInt(15) - randomInt(8);
    if (nextBMP < 50) {
        nextBMP += randomInt(30);
    } else if (nextBMP > 200) {
        nextBMP -= randomInt(30);
    }
    return nextBMP;
}

function getNextHeartRate(currentBMP) {
    let gRN = getRandomNr(currentBMP);
    return gRN;
}

app.get('/currentBPM', async function (req, res) {
    await sleep(5000);
    randBMP = getNextHeartRate(randBMP);
    console.log(randBMP);
    res.json({randBMP});
});

app.listen(PORT, () => {
    console.log(`emulator's server is running on port ${PORT}`);
});