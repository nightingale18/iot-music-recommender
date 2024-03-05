<template>
    <div>
        <div id="startButton">
            <input v-model="device" placeholder="enter URI desc">
            <button class="beautiful-button" @click="getTD">Start</button>
        </div>

        <div v-if="this.randBMP !== null && this.randBMP !== undefined" class="result-container">
            <p class="result-label">Current Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
            </div>
  
            <div v-if="this.playerOn" class="result-container">
                <SongDescButton :audioSource=this.audioSource :genre=this.genre :playerOn=this.playerOn />
            </div>

    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import SongDescButton from './SongDescButton.vue';
import KGMethods from './KnowledgeGraph.vue';

const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

 /* 
    `playerOn`: is used in this and `SongDescButton` component 
    as an indicator function to play an audio element.

    `audioSource`: is initialized in `KnowledgeGraph` component
    to be used by the `SongDescButton` called here.

    `randBMP`: is initialized in `getTD` function and
    is used to 
*/
export default Vue.extend({
    props: {
        randBMP: String,
        audioSource: String,
        playerOn: Boolean
    },
    
    data() {
        return {
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
        /* 
            `getTD()`: requests TD by input field
            and consumes it and subscribes on the event,
            declared in TD properties, and update the 
            current heartbeat value.

            `getSongDesc`: call the function from `KnowledgeGraph`
            component where the this.audioSource and this.genre
            would be defined. 
        */
        async getTD() {

            const servient = new Servient();
            servient.addClientFactory(new HttpClientFactory(null));
            
            servient
                .start()
                .then(async (WoT) => {
                    try {
                        const td = await WoT.requestThingDescription(this.device);
                        const thing = await WoT.consume(td);
                        thing.subscribeEvent("currentHeartRate", async (data) => {
                            let currentValue = await data.value();
                            this.randBMP = currentValue.randBMP;
                            await this.getSongDesc();
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