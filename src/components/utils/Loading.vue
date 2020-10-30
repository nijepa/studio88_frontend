<template>
  <div class="">
    <img src="../assets/img/loading1.gif" alt="" class="loading">
    <p class="loading__text">loading ...</p> 
  </div>
</template>

<script>
  export default {
    name: 'Loading',
  }
</script>

<style>
  .loading {
    height: 250px;
  }

  .loading__text {
    text-align: center;
  }
</style>