<template>
    <div>
        <button @click="getTD">Current heart rate</button>
        <!-- <div v-if="this.randBMP !== null" class="result-container">
            <p class="result-label">Passed Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
        </div> -->
        <div v-if="this.currentData !== null" class="result-container">
            <p class="result-label">Song's Thing Description:</p>
            <p class="result-value">{{ this.currentData }}</p>

            <div v-if="this.info !== null" class="result-container">
            <p class="result-label">Song's URI:</p>
            <p class="result-value">{{ this.info }}</p>

            <!-- <a v-bind:href="this.info">Song's recommendation</a> -->
        </div>
            <!-- <a v-bind:href="this.info">Song's recommendation</a> -->
        </div>
        <!-- <div v-if="randBMP !== null" class="result-container">
            <p class="result-label">Random Value:</p>
            <p class="result-value">{{ randBMP }}</p>
            <SongDescButton :randBMP=randBMP />
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SongDescButton from './SongDescButton.vue';

const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

export default Vue.extend({
    components: {
        SongDescButton
    },
    data() {
        return {
            currentData: null,
            info:null
        };
    },
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async getSongDesc() {
            try {
                const reqOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bmp: this.currentData })
                    
                };
                console.log(this.currentData)
                const response = await fetch('http://localhost:3000/getSongDesc', reqOptions);
                const data = await response.json();
                this.info = data.uri;
            } catch(err){
                    console.error('Error fetching random value:', err.stack);
            };
        },
        async getTD() {

            const servient = new Servient();
            servient.addClientFactory(new HttpClientFactory(null));
            
            servient
                .start()
                .then(async (WoT) => {
                    try {
                        console.log("1");
                        const td = await WoT.requestThingDescription("http://localhost:3001/thingDescription");
                        console.log(td);
                        const thing = await WoT.consume(td);
                        thing.subscribeEvent("currentHeartRate", async (data) => {
                            this.currentData = await data.value();
                            console.log("currentHeartRate:", this.currentData);
                            
                            try {
                                const reqOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ bmp: this.currentData })
                                    
                                };
                                console.log(this.currentData)
                                const response = await fetch('http://localhost:3002/getSongDesc', reqOptions);
                                const data = await response.json();
                                this.info = data.uri;
                            } catch(err){
                                    console.error('Error fetching random value:', err.stack);
                            };


                        });
                    } catch (err) {
                        console.log("Script error:", err);
                    }
                    this.sleep(2000);
                })

        
                
                // const response = await fetch('http://localhost:3000/thingDescription', reqOptions);
                // const data = await response.json();
                // this.info = data.uri;
            .catch((err) => {
                    console.error('Error fetching random value:', err.stack);
            });
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
    color:white;
    font-size: 20px;
    margin-top: 5px;
}
</style>