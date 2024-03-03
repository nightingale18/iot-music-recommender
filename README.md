<h3 align="center" style="margin: 30px 0 35px;">IoT Music Recommender App</h3>

## Features
- High interoperability
- Suitable for multiple devices by implemented W3C Thing Descriptions principles
- Complete documentation and examples

## Install dependencies
```

npm install
cd client && npm install
```

## Use
### Step one： start a server which simulates an average heart beat per minute
```
node simulator_server/server.js
```

### Step two： start a client server
```
cd client && npm run serve
```

### Step three： start a solid server by adding a data folder from our project to a solid one and run server
```

npx @solid/community-server -c @css:config/file.json -f data/
```

## The following RDF graphs where constructed via a <a href="https://www.ldf.fi/service/rdf-grapher"> rdf-grapher tool </a>
### RDF graph for own onthology from `music.ttl`

![alt text](https://github.com/nightingale18/iot-music-recommender/blob/main/png/rdf-graph-music.png?raw=true)

### RDF graph of using own onthology from `music_data.ttl`

![alt text](https://github.com/nightingale18/iot-music-recommender/blob/main/png/rdf-graph-music-data.png?raw=true)

## Example:

![alt text](https://github.com/nightingale18/iot-music-recommender/blob/main/demo/rdf-graph-music-data.png?raw=true)

## License
`MIT`
