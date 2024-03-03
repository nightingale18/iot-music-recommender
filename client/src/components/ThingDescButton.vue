<template>
    <div>
        <div id="startButton">
            <input v-model="device" placeholder="enter device link">
            
            <button class="beautiful-button" @click="getTD">Start</button>
        </div>
        <!-- <div v-if="this.randBMP !== null" class="result-container">
            <p class="result-label">Passed Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
        </div> -->
<!-- 
        <div v-if="this.currentData !== null" class="result-container">
            <p class="result-label">Song's Thing Description:</p>
            <p class="result-value">{{ this.currentData }}</p>
    <input v-model="text">
            <div v-if="this.info !== null" class="result-container">
            <p class="result-label">Song's URI:</p>
            <p class="result-value">{{ this.info }}</p> -->

            <!-- <a v-bind:href="this.info">Song's recommendation</a> -->
        <!-- </div> -->
            <!-- <a v-bind:href="this.info">Song's recommendation</a>  -->
        
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
                            // try {
                            //     const reqOptions = {
                            //         method: 'POST',
                            //         headers: { 'Content-Type': 'application/json' },
                            //         body: JSON.stringify({ bmp: this.currentData })
                                    
                            //     };
                        
                                // console.log(this.currentData)
                                // const response = await fetch('http://localhost:3002/getSongDesc', reqOptions);
                                // const data = await response.json();
                                // this.info = data.uri;
                            // } catch(err){
                            //         console.error('Error fetching random value:', err.stack);
                            // };
                            
                    

                        
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
    /* background-color: #ffedd8; /* Blue background color, you can customize */
  /* color: #ffffff; White text color, you can customize */
  /* padding: 10px 20px; Adjust padding as needed */
  font-size: 16px;
  /* border: none; */
  /* border-radius: 5px; Rounded corners, you can adjust this */
  /* cursor: pointer; */
  /* transition: background-color 0.3s ease; */

  /* Add more styles based on your design */
}
</style>