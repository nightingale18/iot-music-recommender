<template>
    <div>
        <button @click="getRandValue">Get Random Pulse</button>
        <div v-if="randBMP !== null" class="result-container">
            <p class="result-label">Random Value:</p>
            <p class="result-value">{{ randBMP }}</p>
            <SongDescButton :randBMP=randBMP />
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SongDescButton from './SongDescButton.vue';

export default Vue.extend({
    components: {
        SongDescButton
    },
    data() {
        return {
            randBMP: null,
        };
    },
    methods: {
        async getRandValue() {
            try {
                const response = await fetch('http://localhost:3000/getRandPulse');
                const data = await response.json();
                this.randBMP = data.randBMP;
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
    text-align: center;
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