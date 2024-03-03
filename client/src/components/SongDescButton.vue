<template>
    <div>
        <div v-if="this.playerOn" class="result-container">
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
        audioSource: String,
        genre: String,
        playerOn: Boolean
    },
    data() {
        return {
            audioSource: null,
            genre: null,
            playerOn: false
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