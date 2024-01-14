const urdf = require('urdf');
const fs = require('fs');

function getKGData(bmp) {
    const query = `\
    prefix dbo: <http://dbpedia.org/ontology/> \
    prefix music: <http://example.com/music/> \
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
    select ?songURI where {\
        ?song dbo:genre ?musicGenre .\
        ?musicGenre music:suggestedRate ?bmp .\
        ?song rdf:seeAlso ?songURI.\
        filter(?bmp = ${bmp}) \
    }`;

    try {
        return Promise.resolve()
        .then(() => urdf.clear())
        .then(() => {
            const data = fs.readFileSync('data/music_data.ttl', 'utf-8');
            const opts = { format: 'text/turtle' };
            return urdf.load(data, opts);
        })
        // console.log('before query');
        .then(() => urdf.query(query));
        // .then((res) => {
        //     console.log(res);
        //     return res[0];
        // });
        // urdf.clear();
        // urdf.clear();
        // const data = fs.readFileSync('data/music_data.ttl', 'utf-8');
        // const opts = { format: 'text/turtle' };
        // urdf.load(data, opts);
        // return urdf.query(query);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = {getKGData};
