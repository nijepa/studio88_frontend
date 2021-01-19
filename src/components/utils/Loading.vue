<template>
  <div class="">
    <img :src="getPngUrl(pic)" alt="" class="loading">
    <p class="loading__text">loading ...</p> 
  </div>
</template>

<script>
  export default {
    name: 'Loading',

    props: {
      pic: String
    },

    methods: {
      getPngUrl(pic) {
        return require('../../assets/img/' + pic + '.gif')
      },
    }
  }
</script>

<style>
  .loading {
    /* height: 250px; */
    width: 300px;
    margin: 0 auto;
  }

  .loading__text {
    text-align: center;
  }
</style>