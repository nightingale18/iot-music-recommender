<script src="../assets/js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="../assets/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
<script src="../assets/js/bootstrap.js" type="text/javascript"></script>
<script src="../assets/js/awesome-landing-page.js" type="text/javascript"></script>
<template>
    <div class="landing-page landing-page1">
    
        <nav class="navbar navbar-transparent navbar-top" role="navigation">
            <div class="container">
            </div> 
        </nav>
    <div class="wrapper">
        <div class="parallax filter-gradient orange" data-color="orange">
            <div class="parallax-background">
                <img class="parallax-background-image" src="../assets/img/bg.jpg">
            </div>
            <div class= "container">
                <div class="row">
                    <div class="col-md-50">
                        <div class="description">
                            <h2>IoT music recommender</h2>
                            <br>
                            <h5>It provides such features as: random pulse generator, song suggestion based on the pulse data via a Solid Server and a Knowledge Graph and a real-time song's suggestion to multiple devices via on the Thing Description. </h5>
                        </div>
                        <div class="buttons">
                            <RandPulseButton />
                            <ThingDescButton />
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
</div>
    <!-- </div> -->
</template>

<script lang="ts">
import ThingDescButton from './components/ThingDescButton.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        ThingDescButton
    },
});
</script>

<style>
@import '../assets/css/pe-icon-7-stroke.css';
@import '../assets/css/landing-page.css';
@import '../assets/css/bootstrap.css';
</style>