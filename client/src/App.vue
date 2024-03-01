<script src="../assets/js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="../assets/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
<script src="../assets/js/bootstrap.js" type="text/javascript"></script>
<script src="../assets/js/awesome-landing-page.js" type="text/javascript"></script>
<template>
    <!-- <div id="app"> -->
    <!-- <div> -->
        <!-- <div id="app">
        <RandPulseButton />
        <ThingDescButton />
        </div> -->
    <!-- <div>
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="assets/img/favicon.ico">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Awesome Landing Page by Creative Tim</title>

        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        <meta name="viewport" content="width=device-width" />

        <link href="assets/css/bootstrap.css" rel="stylesheet" />
        <link href="assets/css/landing-page.css" rel="stylesheet"/>
            Fonts and icons    
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400,300' rel='stylesheet' type='text/css'>
        <link href="assets/css/pe-icon-7-stroke.css" rel="stylesheet" />
    </div> -->
    <div class="landing-page landing-page1">
    
        <nav class="navbar navbar-transparent navbar-top" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <!-- <div class="navbar-header">
                    <button id="menu-toggle" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar bar1"></span>
                    <span class="icon-bar bar2"></span>
                    <span class="icon-bar bar3"></span>
                    </button>
                    <a href="http://www.creative-tim.com">
                        <div class="logo-container">
                            <div class="logo">
                                <img src="assets/img/new_logo.png" alt="Creative Tim Logo">
                            </div>
                            <div class="brand">
                                Creative Tim
                            </div>
                        </div>
                    </a>
                </div>
                Collect the nav links, forms, and other content for toggling
                <div class="collapse navbar-collapse" id="example" >
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">
                            <i class="fa fa-facebook-square"></i>
                            Like
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i class="fa fa-twitter"></i>
                            Tweet
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i class="fa fa-pinterest"></i>
                            Pin
                            </a>
                        </li>
                    </ul>
                </div> -->
                <!-- /.navbar-collapse -->
            </div> 
        </nav>
    <div class="wrapper">
        <div class="parallax filter-gradient orange" data-color="orange">
            <div class="parallax-background">
                <img class="parallax-background-image" src="../assets/img/showcases/showcase-1/bg.jpg">
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