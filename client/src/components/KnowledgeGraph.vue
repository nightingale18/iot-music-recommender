<script lang="ts">
import urdf from 'urdf';

export default {
    props: {
        randBMP: String
    },
    data() {
        return {
            randBMP: null,
            audioSource: null,
            genre: null
        }
    },
    methods: {
        async getSongDesc() {
            try {
                
                const bmp = Number(this.randBMP.toString().slice(0,-1)+'0');
             
                const info = await this.getKGData(bmp);
                console.log("getSongthis.infoDesc", info);
                const url = info[0]['songURI'].value;
                this.genre = info[0]['genre'].value;
                this.audioSource = url;
                console.log('url ', url);
            } catch(err){
                    console.error('Error fetching random value:', err.stack);
            };
        },

        getKGData(bmp) {
            const query = `\
            prefix dbo: <http://dbpedia.org/ontology/> \
            prefix music: <http://localhost:3000/#> \
            prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
            select ?songURI ?genre where {\
                ?song music:suggestedRate ?bmp .\
                ?song rdf:type ?musicGenre. \
                ?musicGenre rdfs:label ?genre.\
                ?song rdf:seeAlso ?songURI.\
                filter(?bmp = ${bmp}) \
            }`

            const opts = { format: 'text/turtle' };
            
            const musicOntology = 'http://localhost:3000/music.ttl';
            const musicDataTTL = 'http://localhost:3000/music_data.ttl';

            try {
                return Promise.resolve()
                .then(() => urdf.clear())
                .then(() => fetch(musicOntology))
                .then((res) => res.text())
            
                .then((data) => urdf.load(data, opts))
                .then(() => fetch(musicDataTTL))
                .then((res) => res.text())
                
                .then((data) => urdf.load(data, opts))
                .then(() => urdf.query(query));

            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
        },
    }
};
</script>