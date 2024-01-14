<template>
    <div>
        <button @click="getSongDesc">Suggest a song</button>
        <!-- <div v-if="this.randBMP !== null" class="result-container">
            <p class="result-label">Passed Value:</p>
            <p class="result-value">{{ this.randBMP }}</p>
        </div> -->
        <div v-if="this.info !== null" class="result-container">
            <p class="result-label">Song's URI:</p>
            <p class="result-value">{{ this.info }}</p>
            <a v-bind:href="this.info">Song's recommendation</a>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        randBMP:String
    },
    data() {
        return {
            randBMP: null,
            info: null
        };
    },
    methods: {
        async getSongDesc() {
            try {
                const reqOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bmp: this.randBMP })
                    
                };
                console.log(this.randBMP)
                const response = await fetch('http://localhost:3001/getSongDesc', reqOptions);
                const data = await response.json();
                this.info = data.uri;
            } catch(err){
                    console.error('Error fetching random value:', err.stack);
            };
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