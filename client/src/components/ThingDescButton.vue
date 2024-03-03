<template>
    <div>
        <div id="startButton">
            <input v-model="device" placeholder="enter device link">
            
            <button class="beautiful-button" @click="getTD">Start</button>
        </div>

        <div v-if="this.randBMP !== null && this.randBMP !== undefined" class="result-container">
            <p class="result-label">Current Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
            </div>
  
            <div v-if="this.audioSource !== null" class="result-container">
                <SongDescButton :audioSource=this.audioSource :genre=this.genre />
            </div>

    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import SongDescButton from './SongDescButton.vue';
import KGMethods from './KnowledgeGraph.vue';

const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

export default Vue.extend({
    props: {
        randBMP: String,
        audioSource: String
    },
    
    data() {
        return {
            currentData: null,
            info: null,
            url: null,
            randBMP: null,
            audioSource: null,
            playerOn: false,
            genre: null,
            device: ''
        };
    },
    components: {
        SongDescButton
    },
    methods: {
        ...KGMethods.methods,
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async getTD() {

            const servient = new Servient();
            servient.addClientFactory(new HttpClientFactory(null));
            
            servient
                .start()
                .then(async (WoT) => {
                    try {
                        console.log("1");
                        console.log(this.device);
                        const td = await WoT.requestThingDescription(this.device);
                        console.log(td);
                        const thing = await WoT.consume(td);
                        thing.subscribeEvent("currentHeartRate", async (data) => {
                            this.currentValue = await data.value();
                            this.randBMP = this.currentValue.randBMP;
                            console.log("currentHeartRate:", this.randBMP);
                            await this.getSongDesc();
                            console.log('audioSource ',this.audioSource);
                            this.playerOn = true;
                        });
                    } catch (err) {
                        console.log("Script error:", err);
                    }
                    this.sleep(2000);
                })
            .catch((err) => {
                    console.error('Error fetching random value:', err.stack);
            });
        },
    },
});
</script>

<style>
#startButton {
  text-align: center;
  margin-top: 10px;
}

.result-container {
    margin-top: 20px;
    text-align: right;
    color:white;
}
.result-label {
    font-weight: bold;
}
.result-value {
    color:white;
    font-size: 20px;
    margin-top: 5px;
}

.beautiful-button {
  font-size: 16px;
}
</style>