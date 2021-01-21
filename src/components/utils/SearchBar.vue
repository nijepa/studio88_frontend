<template>
  <div class="clients__ss search_group">
    <div class="search__bar">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" height="30px" viewBox="0 0 297.888 297.888">
        <g>
          <path class="svg__parts" style="fill:var(--purple);" d="M218.971,187.618c8.659,8.658,8.659,22.695,0,31.354c-8.657,8.658-22.694,8.657-31.352,0
            l-50.096-50.096c-8.657-8.658-8.659-22.695-0.001-31.353c8.659-8.659,22.696-8.658,31.355,0L218.971,187.618z"/>
          <circle class="svg__parts" style="fill:var(--purple);" cx="100.697" cy="100.697" r="100.697"/>
          <circle class="svg__parts" style="fill:var(--purple-light);" cx="100.697" cy="100.697" r="64.794"/>
          <path class="svg__parts" style="fill:var(--purple);" d="M186.271,233.504c-13.044-13.042-13.044-34.191,0-47.234c13.043-13.044,34.19-13.043,47.234,0
            l54.6,54.601c13.044,13.043,13.044,34.19,0,47.234c-13.042,13.043-34.19,13.043-47.234,0L186.271,233.504z"/>
        </g>
      </svg>
      <input type="text" name="search" id="search" @keyup="searchClients()"
              v-model="search" class="login_input search_input">
    </div>

    <div class="page__size">
      <label for="days">Prikaži</label>
      <div class="login_input user_input nr_clients">
        <select name="days" id="days" class=""
                v-model="pageSize" 
                :value="pageSize" 
                @change="setPageSize()">
          <option :value="Number(10)">10</option>
          <option :value="Number(20)">20</option>
          <option :value="Number(50)">50</option>
          <option :value="Number(1000)">sve</option>
        </select>
      </div>
      <label for="days">vježbačica</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',

    props: {
      searchStr: String,
      pageSizeNr: Number,
      searchClients: Function,
      setPageSize: Function
    },

    data() {
      return {
        search: this.searchStr,
        pageSize: this.pageSizeNr
      }
    }

  }
</script>

<style>

</style>