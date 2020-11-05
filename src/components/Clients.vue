<template>
  <div class="">
    
    <div v-if="loadingState" class="">
      <img src="../assets/img/loading1.gif" alt="" class="loading">
      loading ...
    </div>
    
    <div v-else class="client__wrapper">
      <div class="">
        <button type="submit" @click="newClient()" class="action_btn client__add">
          <svg version="1.1" id="Capa_1" x="0px" y="0px" fill="var(--purple)"
              width="40px" height="40px" viewBox="0 0 498.306 498.306" style="enable-background:new 0 0 498.306 498.306;">
            <g>
              <g>
                <path d="M68.107,497.729c0.48,0.377,1.071,0.577,1.677,0.577h41.224c0.517,0,1.01-0.138,1.441-0.41l23.024-14.499h235.166
                  c1.418,0,2.587-1.091,2.688-2.509l0.871-13.155c0.096-1.438-0.961-2.698-2.393-2.845l-159.271-17.04l35.746-46.866l52.154,0.851
                  c0.729-0.016,1.69-0.399,2.21-1.103l16.215-22.189l63.477-26.042l-3.822,31.413c-0.031,0.199-0.031,0.397-0.011,0.587
                  l6.929,69.429l-7.569,16c-0.305,0.641-0.336,1.396-0.1,2.069l3.507,9.647c0.384,1.072,1.396,1.774,2.524,1.774h75.43
                  c0.898,0,1.737-0.452,2.235-1.208c0.499-0.756,0.584-1.69,0.247-2.529l-4.378-10.521c-0.419-1.008-1.4-1.657-2.488-1.657h-18.95
                  l-22.998-26.296l10.421-124.294c0.078-0.74-0.163-1.454-0.662-2.007l-7.024-7.895c-0.509-0.572-1.238-0.907-2.005-0.907h-90.547
                  l-10.231-100.624l10.421-41.649c0.073-0.294,0.1-0.591,0.068-0.903l-7.812-83.313l7.444-12.403
                  c0.541-0.887,0.52-1.997-0.063-2.858l-19.732-30.027V2.688c0-1.483-1.202-2.688-2.688-2.688h-12.278
                  c-1.396,0-2.558,1.066-2.678,2.452l-4.373,49.122c-0.036,0.304-0.005,0.601,0.068,0.892l6.915,27.644l-8.627,105.188l-3.218,1.919
                  c-0.623,0.37-1.064,1.005-1.233,1.714l-3.548,16.068l-13.774,121.389l-17.883,0.787c-0.548,0.022-1.052,0.21-1.483,0.532
                  L135.72,404.011c-0.656,0.483-1.053,1.244-1.086,2.058l-0.785,21.812l-8.627-0.551l0.753-15.776
                  c0.036-0.761-0.247-1.495-0.785-2.036c-0.544-0.535-1.302-0.803-2.042-0.776l-31.806,1.773l-30.699,4.39
                  c-0.548,0.083-1.039,0.314-1.452,0.683l-21.926,20.178c-0.555,0.504-0.866,1.229-0.866,1.974v33.324c0,0.812,0.37,1.584,1.01,2.11
                  L68.107,497.729z"/>
              </g>
            </g>
          </svg>
          <p>Nova vježbačica</p> 
        </button>
        <div class="search__bar">
          <svg version="1.1" id="Layer_1" x="0px" y="0px" height="30px" viewBox="0 0 297.888 297.888" style="enable-background:new 0 0 297.888 297.888;" xml:space="preserve">
            <g>
              <path class="svg__parts" style="fill:var(--purple);" d="M218.971,187.618c8.659,8.658,8.659,22.695,0,31.354c-8.657,8.658-22.694,8.657-31.352,0
                l-50.096-50.096c-8.657-8.658-8.659-22.695-0.001-31.353c8.659-8.659,22.696-8.658,31.355,0L218.971,187.618z"/>
              <circle class="svg__parts" style="fill:var(--purple);" cx="100.697" cy="100.697" r="100.697"/>
              <circle class="svg__parts" style="fill:var(--purple-light);" cx="100.697" cy="100.697" r="64.794"/>
              <path class="svg__parts" style="fill:var(--purple);" d="M186.271,233.504c-13.044-13.042-13.044-34.191,0-47.234c13.043-13.044,34.19-13.043,47.234,0
                l54.6,54.601c13.044,13.043,13.044,34.19,0,47.234c-13.042,13.043-34.19,13.043-47.234,0L186.271,233.504z"/>
            </g>
          </svg>
          <input type="text" name="search" id="search" v-model="search" class="login_input search_input">
        </div>
      </div>

      <div class="">
        <div class="days__list"><span>Ime</span><span>E-mail</span><span>Mobilni</span><span>Aktivna</span></div>
        <div v-for="client in filteredList" :key="client._id" @click="selectClient(client)" class="clients__list">
          <p class="client__item">{{ client.last_name }} , {{ client.first_name }}</p>
          <p class="client__item">{{ client.email }}</p>
          <p class="client__item">{{ client.mobile }}</p>
          <!-- <p class="client__item">{{ client.active }}</p> -->
          <p class="client__item"><input type="checkbox" class="" v-model="client.active"></p>
        </div>
      </div>
      
    </div>
    
    <jw-pagination :items="getAllClients" @changePage="onChangePage" :labels="customLabels" :styles="customStyles"></jw-pagination>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';

  const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
  };

  const customStyles = {
    ul: {
        //border: '2px solid red'
    },
    li: {
        display: 'inline-block',
        //border: '2px dotted green'
    },
    a: {
        color: 'var(--purple-dark)'
    }
  };

  export default {
    name: 'Clients',

    data() {
      return {
        pageOfItems: [],
        customLabels,
        customStyles,
        search: '',
        appeared: false
      }
    },

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'loadingState' ]),

      filteredList() {
/*         this.getAllClients.filter(post => {
          return post.name.toLowerCase().includes(this.search.toLowerCase())
        })  */
        
        let mu = this.pageOfItems.filter(post => {
          return post.name.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.email.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.mobile.includes(this.search)
        })
        //this.pageOfItems = mu
        return mu
      }
    },

    methods: {
      ...mapActions([ 'fetchClients', 
                      'fetchClient',
                      'clientClear',
                      'formTypeChange',
                      'setLoadingState' ]),

      onChangePage(pageOfItems) {
        // update page of items
        this.pageOfItems = pageOfItems;
      },
      
      async newClient() {
        this.setLoadingState(true);
        this.formTypeChange('client');
        await this.clientClear();
      },

      async selectClient(client) {
        this.setLoadingState(true);
        await this.fetchClient(client);
        this.formTypeChange('client');
        //this.$emit('toggled-form', 3);
      },

      onAppeared() {
        this.appeared = true;
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('dddd, LL')
        }
      }
    },

    async mounted() {
      await this.fetchClients();
      this.setLoadingState(false);
    }
  }
</script>

<style>
  .client__wrapper {
    display: grid;
    justify-content: center;
    justify-items: left;
  }

  .clients__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1em;
    justify-content: center;
    justify-items: center;
    margin-top: 1em;
    cursor: pointer;
    border-radius: 1em;
    transition: ease .5s all;
  }

  div.clients__list:nth-child(even) {border: 2px solid var(--purple-light);}
  div.clients__list:nth-child(odd) {
/*    background: var(--purple-lighter);
    border: 2px solid transparent; */
  }

  .clients__list:hover {
    background: var(--purple-light);
  }
/* 
  div.clients__list:nth-child(odd):hover {
    background: transparent;
    border: 2px solid var(--purple);
  } */

  .client__item {
    /* background: var(--purple-light); */
    border-radius: 1em;
    padding: 1em;
    margin: 0;
  }

  .client__add {
    margin-bottom: 1em;
    color: var(--purple);
    border-bottom: 2px solid var(--purple);
  }

  .client__add:hover {
    color: var(--purple-dark);
    border-bottom: 2px solid var(--purple-dark);
  }

  .client__add:hover svg g {
    fill: var(--purple-dark);
  }

  .search__bar {
    display: flex;
    align-content: center;
    align-items: center;
  }

  .search__bar svg {
    cursor: pointer;
  }

  .search__bar:hover svg g {
      fill: var(--gold) !important;
    }
  .svg__parts:hover {
    fill: var(--gold) !important;
  }

  .search_input {
    margin-bottom: .1em;
    padding: 0.2em .2em .2em;
  }

  .loading {
    height: 250px;
  }
</style>