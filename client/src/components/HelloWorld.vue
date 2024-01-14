<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            message: '',
        };
    },
    mounted() {
        fetch('http://localhost:3001')
            .then(response =>response.text())
            .then(data => {
                this.message = data;
            })
            .catch(error => {
                console.error('error fetching data: ', error);
            });
    },
};
</script>