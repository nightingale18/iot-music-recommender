<template>
    <div>
        <button @click="getTD">Thing Description</button>
        <!-- <div v-if="this.randBMP !== null" class="result-container">
            <p class="result-label">Passed Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
        </div> -->
        <div v-if="this.currentData !== null" class="result-container">
            <p class="result-label">Song's Thing Description:</p>
            <p class="result-value">{{ this.currentData }}</p>
            <!-- <a v-bind:href="this.info">Song's recommendation</a> -->
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

export default Vue.extend({
    // props: {
    //     randBMP:String
    // },
    data() {
        return {
            currentData: null
        };
    },
    methods: {
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
                        const td = await WoT.requestThingDescription("http://localhost:3000/thingDescription");
                        console.log(td);
                        const thing = await WoT.consume(td);
                        thing.subscribeEvent("currentHeartRate", async (data) => {
                            this.currentData = await data.value();
                            console.log("currentHeartRate:", this.currentData);
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