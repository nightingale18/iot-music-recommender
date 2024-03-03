<template>
    <div>
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