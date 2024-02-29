<template>
    <div>
        <button @click="getSongDesc">Suggest a song</button>
        <!-- <div v-if="this.randBMP !== null" class="result-container">
            <p class="result-label">Passed Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
        </div> -->
        <div v-if="this.info !== null" class="result-container">
            <!-- <p class="result-label">Song's URI:</p>
            <p class="result-value">{{ this.url }}</p> -->
            <a v-bind:href="this.info">Song's recommendation</a>
            <vue-sound
                livestream
                show-download
                title="The Show"
                title-link="http://www.google.com"
                details="Lorem Ipsum Dolor Sit Amet"
                details-link="http://www.bing.com"
                file="this.info"
            />
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import urdf from 'urdf';

export default Vue.extend({
    props: {
        randBMP: String
    },
    data() {
        return {
            randBMP: null,
            info: null,
            url: null,
        };
    },
    methods: {
        async getSongDesc() {
            try {
 
                console.log(this.randBMP)
                
                let bmp = Number(this.randBMP.toString().slice(0,-1)+'0');
                this.info = await this.getKGData(bmp);
                this.url = this.info[0]['songURI'].value.slice(1, -1);
                console.log('this.info ', this.url);
            } catch(err){
                    console.error('Error fetching random value:', err.stack);
            };
        },

        getKGData(bmp) {
            const query = `\
            prefix dbo: <http://dbpedia.org/ontology/> \
            prefix music: <http://localhost:3002/#> \
            prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
            select ?songURI ?gComment where {\
                ?song music:suggestedRate ?bmp .\
                ?song rdf:type ?musicGenre. \
                ?musicGenre rdfs:comment ?gComment.\
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
    },
});
</script>

<style>

.result-container {
    margin-top: 20px;
    text-align: right;
}
.result-label {
    font-weight: bold;
}
.result-value {
    color:purple;
    font-size: 20px;
    margin-top: 5px;
}
</style>