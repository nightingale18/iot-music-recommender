<template>
    <div>
        <!-- <button @click="getSongDesc">Suggest a song</button> -->

        <div v-if="this.audioSource !== null && this.audioSource !== undefined" class="result-container">
            <p class="result-label">Song's recommendation:</p>
            <p class="result-value">{{ this.genre }}</p>

            <div id="app">
                <audio ref="myAudio" :src="this.audioSource" controls autoplay></audio>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import urdf from 'urdf';


export default Vue.extend({
    props: {
        randBMP: String,
        audioSource: String,
        genre: String
    },
    data() {
        return {
            randBMP: null,
            info: null,
            url: null,
            currentAudioName: '',
            audioSource: null,
            genre: null,
            audioList: [
                {
                name: 'audio1',
                url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3'
                }
            ]
        };
    },
    mounted() {
        const audioElement = this.$refs.myAudio;

        // Check if the audio is paused, and then play it
        if (audioElement.paused) {
        audioElement.play().then(() => {
            console.log('Audio playback started successfully.');
        }).catch(error => {
            console.error('Error starting audio playback:', error.message);
        });
        }
  },
    // methods: {
    //     async getSongDesc() {
    //         try {
 
    //             console.log(this.randBMP)
                
    //             let bmp = Number(this.randBMP.toString().slice(0,-1)+'0');
    //             this.info = await this.getKGData(bmp);
    //             this.url = this.info[0]['songURI'].value.slice(1, -1);
    //             this.audioList[0]['url'] = this.url;
    //             this.audioSource = this.url;
    //             console.log('this.url ', this.url);
    //         } catch(err){
    //                 console.error('Error fetching random value:', err.stack);
    //         };
    //     },

    //     getKGData(bmp) {
    //         const query = `\
    //         prefix dbo: <http://dbpedia.org/ontology/> \
    //         prefix music: <http://localhost:3002/#> \
    //         prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
    //         prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
    //         select ?songURI ?gComment where {\
    //             ?song music:suggestedRate ?bmp .\
    //             ?song rdf:type ?musicGenre. \
    //             ?musicGenre rdfs:comment ?gComment.\
    //             ?song rdf:seeAlso ?songURI.\
    //             filter(?bmp = ${bmp}) \
    //         }`

    //         const opts = { format: 'text/turtle' };
            
    //         const musicOntology = 'http://localhost:3000/music.ttl';
    //         const musicDataTTL = 'http://localhost:3000/music_data.ttl';

    //         try {
    //             return Promise.resolve()
    //             .then(() => urdf.clear())
    //             .then(() => fetch(musicOntology))
    //             .then((res) => res.text())
            
    //             .then((data) => urdf.load(data, opts))
    //             .then(() => fetch(musicDataTTL))
    //             .then((res) => res.text())
                
    //             .then((data) => urdf.load(data, opts))
    //             .then(() => urdf.query(query));

    //         } catch (error) {
    //             console.error(`Error: ${error.message}`);
    //         }
    //     },
    // },
});
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}

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