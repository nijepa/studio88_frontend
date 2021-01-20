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
        console.log(pic)
        return require('../../assets/img/loading' + Math.floor(Math.random() * 4) + '.gif')
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