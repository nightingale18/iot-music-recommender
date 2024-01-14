<template>
    <!-- <div id="app"> -->
    <div>
        <div id="app">
        <RandPulseButton />
    </div>
    
</div>
</template>

<script lang="ts">
import RandPulseButton from './components/RandPulseButton.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        RandPulseButton,
    },
});
</script>

<style>
#app {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#desc {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    text-align: right;
    color: #2c3e50;
    margin-top: 60px;
}
</style>