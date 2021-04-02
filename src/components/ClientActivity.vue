<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading1" v-if="loadingState" key="1" />
    
    <div v-else class="client__wrapper" key="2" id="tops">

      <div class="activities__header">
        <button 
          type="submit" 
          @click="selectClient()" 
          class="action_btn client__add for_mobile"
        >
          <svg version="1.1" id="Layer_1"  x="0px" y="0px" height="40px"
                viewBox="0 0 408.761 408.761" style="enable-background:new 0 0 408.761 408.761;" xml:space="preserve">
              <g>
                <path style="fill:var(--purple-light);" d="M204.385,408.761c-58.121,0-113.675-24.868-152.418-68.227
                  C18.46,303.059,0.005,254.703,0.005,204.381C0.005,91.685,91.689,0,204.385,0c50.317,0,98.674,18.455,136.163,51.964
                  c43.348,38.762,68.207,94.316,68.207,152.417C408.755,317.076,317.075,408.761,204.385,408.761"/>
                <path style="fill:var(--purple);" d="M377.759,204.379c0,18.08-2.77,35.521-7.911,51.901c-0.849,2.72-1.769,5.409-2.759,8.07
                  c-16.511,44.83-51.031,80.96-94.791,99.59c-15.779,6.729-32.759,11.18-50.529,12.95c-5.721,0.58-11.51,0.87-17.38,0.87
                  c-51.39,0-97.561-22.361-129.301-57.881c-0.26-0.29-0.519-0.589-0.79-0.879c-26.95-30.562-43.289-70.681-43.289-114.622
                  c0-95.749,77.619-173.38,173.38-173.38c43.95,0,84.069,16.35,114.629,43.291c0.29,0.27,0.591,0.53,0.881,0.79
                  C355.409,106.84,377.759,152.989,377.759,204.379"/>
                <path style="fill:var(--purple);" d="M74.354,319.061c3.691,4.18,7.58,8.181,11.653,11.988c-3.805-3.558-7.447-7.283-10.918-11.168
                  C74.846,319.61,74.605,319.332,74.354,319.061 M64.213,306.438c0.014,0.019,0.031,0.042,0.045,0.062
                  C64.243,306.479,64.228,306.458,64.213,306.438 M63.885,305.987c0.062,0.085,0.125,0.173,0.187,0.258
                  C64.009,306.158,63.948,306.074,63.885,305.987 M63.606,305.601c0.063,0.088,0.128,0.177,0.191,0.265
                  C63.733,305.777,63.671,305.69,63.606,305.601 M63.304,305.18c0.086,0.12,0.172,0.241,0.259,0.361
                  C63.476,305.421,63.389,305.299,63.304,305.18 M163.353,35.884C87.403,54.315,31.004,122.757,31.004,204.371
                  c0,37.592,11.957,72.385,32.283,100.785c-20.323-28.403-32.278-63.193-32.278-100.777C31.009,122.766,87.402,54.317,163.353,35.884
                  "/>
                <path style="fill:var(--purple);" d="M204.383,31.001c-14.138,0-27.875,1.691-41.03,4.883C87.402,54.317,31.009,122.766,31.009,204.379
                  c0,37.584,11.955,72.375,32.278,100.778c0.005,0.007,0.011,0.016,0.016,0.023c0.086,0.12,0.173,0.241,0.259,0.361
                  c0.014,0.02,0.03,0.042,0.044,0.061c0.064,0.089,0.127,0.176,0.191,0.265c0.03,0.042,0.057,0.08,0.088,0.121
                  c0.063,0.087,0.124,0.171,0.187,0.258c0.048,0.066,0.093,0.127,0.141,0.193c0.015,0.02,0.03,0.041,0.045,0.062
                  c3.172,4.344,6.542,8.536,10.096,12.561c0.251,0.271,0.492,0.549,0.735,0.819c3.472,3.885,7.114,7.61,10.918,11.168
                  c2.105,1.967,4.258,3.882,6.458,5.743c-25.531-30.2-40.921-69.241-40.921-111.88c0-95.751,77.621-173.37,173.381-173.37
                  c42.629,0,81.68,15.39,111.869,40.919C305.004,54.871,257.485,31.001,204.383,31.001"/>
                <path style="fill:var(--purple);" d="M296.129,193.38l-146.18,12.269v35.941l122.35,122.35c43.76-18.63,78.28-54.76,94.791-99.59
                  L296.129,193.38"/>
                <polygon style="fill:#FFFFFF;" points="112.634,204.381 149.945,167.169 149.945,193.381 296.125,193.381 296.125,215.381 
                  149.945,215.381 149.945,241.593 	"/>
              </g>
          </svg>
          <p>Nazad</p> 
        </button>
        <h1 class="cient__name">{{ getOneClient.name }}</h1>
      </div>

      <transition name="rise" mode="out-in">
        <div v-if="!toggleActions" class="activities__btns" >
          <button 
            class="action_btn client__add for_mobile"
            @click="toggleActions = 'p'"
          >
            <svg version="1.1" id="Capa_1" x="0px" y="0px"
              width="30px" height="30px" viewBox="0 0 30 30" fill="var(--gold)" style="enable-background:new 0 0 30 30;" xml:space="preserve">
              <path d="M15,0C6.729,0,0,6.729,0,15c0,8.271,6.729,15,15,15c8.271,0,15-6.729,15-15C30,6.729,23.271,0,15,0z M15,27.777
                C7.956,27.777,2.223,22.046,2.223,15S7.956,2.223,15,2.223S27.777,7.954,27.777,15S22.044,27.777,15,27.777z"/>
              <path d="M15,3.5C8.66,3.5,3.5,8.659,3.5,15S8.66,26.5,15,26.5S26.5,21.341,26.5,15S21.34,3.5,15,3.5z M19.145,10.677
                c-0.754-0.593-1.61-0.89-2.568-0.89c-0.741,0-1.395,0.239-1.957,0.718c-0.563,0.479-0.963,1.116-1.199,1.912h4.309v1.891h-4.611
                c-0.027,0.397-0.041,0.674-0.041,0.829c0,0.184,0.007,0.381,0.02,0.598h4.63v1.922h-4.328c0.506,1.699,1.514,2.548,3.024,2.548
                c0.95,0,1.856-0.304,2.72-0.911v2.488c-0.795,0.484-1.832,0.728-3.115,0.728c-1.516,0-2.753-0.42-3.71-1.259
                s-1.591-2.038-1.901-3.595H9.182v-1.923h0.971c-0.014-0.168-0.021-0.367-0.021-0.597c0-0.12,0.014-0.396,0.041-0.829H9.182v-1.891
                h1.285c0.37-1.558,1.072-2.768,2.103-3.63c1.032-0.863,2.316-1.295,3.853-1.295c1.126,0,2.032,0.186,2.72,0.557v2.629H19.145z"/>
            </svg>
            Plaćanje
          </button>
          <Tooltip tip="Klikni na plaćanje / prisustvo za dodavanje istog ili selektuj klijenta iz liste za izmjenu / brisanje" />
          <button 
            class="action_btn client__add for_mobile" 
            @click="toggleActions = 'a'"
          >
            <svg version="1.1" x="0px" y="0px" fill="var(--gold)" width="30px" height="30px" 
              viewBox="0 0 1000 1000" enable-background="new 0 0 30 30" xml:space="preserve">
              <path d="M411.3,882.2c-2.8,0.2-4.7,0.5-6.6,0.5c-52.6,0.5-105.1-2.5-157.5-7.5c-38.2-3.7-76.3-7.4-114.2-12.5c-26-3.4-51.7-9.1-77.5-13.9c-11.8-2.2-17.8-10-21-21.2c-7-24.7-8.3-50-6.2-75.4c1.2-15.1,2.8-30.1,5-45.1c3.9-27,20.5-45.2,42.8-59.1c19.2-11.9,41-16.9,62.2-23.5c22.4-7,45.1-13.4,67-21.9c22.4-8.8,42.4-22,57.1-41.9c7.8-10.6,11.8-22.5,11.3-35.8c-0.3-9.4-0.9-18.9-1.9-28.4c-1.2-11.4-6.7-20.7-15.1-28.4c-5.6-5.1-11.1-10.6-17.3-15.1c-13.2-9.6-21.9-22.4-27.7-37.2c-4.2-10.5-7.5-21.3-11.6-31.9c-0.8-2.1-2.6-4.7-4.5-5.5c-11.1-4.5-19-12.7-24.3-22.7c-14.6-28-16.1-55.7,4.5-82.1c1.3-1.7,1.5-4.3,1.7-6.6c1.9-24.7,2.5-49.6,5.8-74.2c3.9-28.7,10.4-57.1,24.4-83c28.3-52.2,71.8-84.4,130-95.2C400.6,3,460.2,13.2,515.7,45.3c31.9,18.4,53.4,45.6,66.9,79.1c13.7,33.9,21,69.4,23.2,105.9c0.7,12.9,1.2,25.9,1.9,38.8c0.1,1.7,0.6,3.9,1.7,4.9c11.5,10.8,15.4,24.6,14.9,39.7c-0.6,16.3-2.6,32.4-12.4,46.4c-5.6,8-12.7,14-21.6,18c-2.1,1-4.3,3.3-5.1,5.5c-3.7,9.6-6.7,19.4-10.3,28.9c-0.8,2.1-2.9,4.3-5,5.1c-43.1,17.9-80.5,44.2-112.7,77.9c-45.6,47.7-75,103.8-85.9,169.1c-12.3,73.9,0.4,143.8,36,209.5C408.6,876.6,409.7,879,411.3,882.2z"/><path d="M695.8,437.1c-152.6,0-276.6,123.8-276.7,276.3C419,866.1,543.2,990.1,696.2,990c152.2-0.1,276.2-123.9,276.4-276.1C972.9,561.2,848.7,437.2,695.8,437.1z M878.3,634.1l-219,221.8c0.2-0.3,0.5-0.6,0.7-0.9c-7.2,7.8-13-0.6-12.7-0.3L503,711.4c-4.7-4.7-4.7-12.4,0-17.2l34.5-35.1c4.7-4.7,12.4-4.7,17.2,0l100,100l172.5-175.9c4.7-4.7,12.3-4.7,16.9,0l33.9,33.9c4.7,4.7,4.7,12.3,0,16.9H878.3z"/>
            </svg>
            Prisustvo
          </button>
        </div>

        <ClientPayment 
          v-else-if="toggleActions === 'p'" 
          :client="getOneClient" 
          :clientAtt="clientAct"
          @canceled="handleCanceled" 
          key="2"
        />

        <ClientAttendance 
          v-else-if="toggleActions === 'a'"
          :client="getOneClient" 
          :clientAtt="clientAct"
          @canceled="handleCanceled" 
          key="3"
        />
      </transition>

      <div class="period">
        
        <div class="dash__text filter_bar">
          <Tooltip class="tool__act" tip="Izaberi datume za prikazivanje svih prisustava / plaćanja u tom periodu" />
          Period od 
          <datepicker v-model="dateFrom" 
                      placeholder="datum upisa" 
                      class="login_input user_input datepicker"
                      :language="sr"
                      :format="customFormatter"
                      @input="selectPeriod()">
          </datepicker> 
          do 
          <datepicker v-model="dateTill" 
                      placeholder="datum upisa" 
                      class="login_input user_input datepicker"
                      :language="sr"
                      :format="customFormatter"
                      @input="selectPeriod()">
          </datepicker>
        </div>
      </div>

      <div class="activities__wrapper">
        <div class="">
          <h3 class="activities__title">
            Plaćanja - ukupno : 
            <span class="activities__title_val"> {{ totalPayments() }}</span>
          </h3>
          <div class="payments__head days__list ">
            <span>Godina</span>
            <span>Mjesec</span>
            <span>Datum</span>
            <span>Iznos</span>
            <span>Napomena</span>
          </div>
          <div 
            v-for="client in pageOfItems" 
            :key="client._id" 
            class="activities__list payments"
            @click="handleUpdate(client, true)"
          >
            <p class="activities__item">{{ client.year }}</p>
            <p class="activities__item">{{ client.month }}</p>
            <p class="activities__item">{{ client.date | formatDate1 }}</p>
            <p class="activities__item">{{ client.amount }}</p>
            <p class="activities__item">{{ client.note }}</p>
          </div>

          <jw-pagination :items="filteredClients" @changePage="onChangePage" 
                          :initialPage="initialPage" :pageSize="pageSize" 
                          :labels="customLabels" :styles="customStyles"
                          class="pagine">
          </jw-pagination>
        </div>

        <div class="">
          <h3 class="activities__title">
            Prisustva - ukupno : 
            <span class="activities__title_val"> {{ totalAttendances() }} </span> od 
            <span class="activities__title_val"> {{ clientAttendances.length }}</span>
          </h3>
          <div class="days__list attendances__head">
            <span>Datum</span>
            <span>Prisutna</span>
            <span>Napomena</span>
          </div>
          <div 
            v-for="client in pageOfItemsA" 
            :key="client._id" 
            class="activities__list attendances"
            @click="handleUpdate(client, false)"
          >
            <p class="activities__item">{{ client.date | formatDate }}</p>
            <input 
              type="checkbox" 
              class="activities__item activities__check" 
              v-model="client.present" 
              onclick="return false;" 
              readonly="readonly"
            >
            <p class="activities__item">{{ client.note }}</p>
          </div>

          <jw-pagination :items="filteredClientsA" @changePage="onChangePageA" 
                          :initialPage="initialPage" :pageSize="pageSize" 
                          :labels="customLabels" :styles="customStyles"
                          class="pagine">
          </jw-pagination>
        </div>
      </div>
      
    </div>
  </transition>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import navigation from '../mixins/navigation';
  import navigationSearch from '../mixins/navigationSearch';
  import ClientAttendance from '../components/ClientAttendance';
  import ClientPayment from '../components/ClientPayment';
  import Tooltip from '@/components/utils/Tooltip.vue';

  export default {
    name: 'ClientActivity',

    components: {
      Loading,
      Datepicker,
      ClientAttendance,
      ClientPayment,
      Tooltip
    },

    mixins: [
      navigation,
      navigationSearch
    ],

    data() {
      return {
        sr: sr,
        clientPayments: [],
        clientAttendances: [],
        pageOfItemsA: [],
        filteredClientsA: [],
        customLabels,
        customStyles,
        search: '',
        dateFrom: this.getPreviousMonday(),
        dateTill: new Date().toISOString().slice(0,10),
        appeared: false,
        toggleActions: '',
        clientAct: {}
      }
    },

    computed: {
      ...mapGetters([ 'getOneClient',
                      'getAllAttendances',
                      'getAllPayments',
                      'getFromForm',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchClient',
                      'fetchPayments',
                      'fetchAttendances',
                      'clientClear',
                      'fetchClientsPageSize',
                      'formTypeChange',
                      'setLoadingState' ]),

      async handleCanceled() {
        this.clientAct = {}
        this.toggleActions = ''
        await this.fetchAttendances()
        await this.fetchPayments()
        this.selectPeriod()
      },

      handleUpdate(client, act) {
        this.clientAct = client
        act ? this.toggleActions = 'p' : this.toggleActions = 'a'
        this.scrollToElement({behavior: 'smooth'})
      },

      setPageSize(val) {
        this.pageSize = val;
        this.fetchClientsPageSize(val);
      },

      onChangePageA(pageOfItems) {
        this.pageOfItemsA = pageOfItems;
      },

      customFormatter(date) {
        return moment(date).format('DD MMM YYYY');
      },

      getPreviousMonday() {
        let firstDay = new Date(new Date().getFullYear(), 0, 2);
        return new Date(firstDay).toISOString().slice(0,10);
      },
      
      async newClient() {
        this.setLoadingState(true);
        this.formTypeChange('client');
        await this.clientClear();
      },

      async selectClient() {
        this.setLoadingState(true);
        this.formTypeChange(this.getFromForm);
      },

      selectPeriod() {
        this.clientAttendances = this.mapAttendances().filter(post => {
            return post.client._id == this.getOneClient._id
          })
          .filter(year => 
                    moment(year.date).format('YYYY-MM-DD') >= moment(this.dateFrom).format('YYYY-MM-DD') && 
                    moment(year.date).format('YYYY-MM-DD') <= moment(this.dateTill).format('YYYY-MM-DD'));
        this.filteredClientsA = this.clientAttendances;
        this.clientPayments = this.mapPayments().filter(post => {
            return post.client._id == this.getOneClient._id
          })
          .filter(year => 
                    moment(year.datep).format('YYYY-MM-DD') >= moment(this.dateFrom).format('YYYY-MM-DD') && 
                    moment(year.datep).format('YYYY-MM-DD') <= moment(this.dateTill).format('YYYY-MM-DD'));
        this.filteredClients = this.clientPayments;
      },

      mapPayments() {
        let obj, arr = []
        for (let i=0; i<this.getAllPayments.length; i++) {
          for(let j=0; j<this.getAllPayments[i].members.length; j++) {
            obj = {
              "year": this.getAllPayments[i].payment_year,
              "month": this.getAllPayments[i].payment_month,
              "datep": this.getAllPayments[i].payment_date,
              "amount": this.getAllPayments[i].members[j].payment_amount,
              "date": this.getAllPayments[i].members[j].payment_date,
              "client": this.getAllPayments[i].members[j].client,
              "note": this.getAllPayments[i].members[j].note
            }
            arr.push(obj)
          }
        }
        return arr
      },

      mapAttendances() {
        let obj, arr = []
        for (let i=0; i<this.getAllAttendances.length; i++) {
          for(let j =0; j<this.getAllAttendances[i].members.length; j++) {
            obj = {
              "date": this.getAllAttendances[i].attend_date,
              "present": this.getAllAttendances[i].members[j].present,
              "note": this.getAllAttendances[i].members[j].note,
              "client": this.getAllAttendances[i].members[j].client
            }
            arr.push(obj)
          }
        }
        return arr
      },

      totalPayments() {
        return this.clientPayments.reduce((n, {amount}) => n + amount, 0)
      },

      totalAttendances() {
        return this.clientAttendances.reduce((n, {present}) => n + present, 0)
      },

      onAppeared() {
        this.appeared = true;
      },

      scrollToElement(options) {
        const el = document.getElementById('tops');
        console.log(el)
        if (el) {
          el.scrollIntoView(options);
        }
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          moment.locale('sr');
          return moment(String(value)).format('ll dddd')
        }
      },
      formatDate1: function(value) {
        if (value) {
          moment.locale('sr');
          return moment(String(value)).format('DD MMM YYYY')
        }
      }
    },

    async mounted() {
      await this.fetchPayments();
      await this.fetchAttendances();
      this.clientPayments = this.mapPayments().filter(post => {
        return post.client._id == this.getOneClient._id
      });
      this.clientAttendances = this.mapAttendances().filter(post => {
        return post.client._id == this.getOneClient._id
      });
      this.selectPeriod();
      this.pageSize = 12;
      this.setLoadingState(false);
    }
  }
</script>

<style>
  .period {
    display: grid;
    justify-self: center;
    align-items: center;
  }
  
  .activities__btns {
    display: flex;
    justify-content: space-between;
    justify-self: stretch;
    margin: .5em;
    padding: 0 .5em;
    background: var(--gold-lighter);
    /* border: 2px solid var(--purple-dark); */
    border-radius: .5em;
  }
  .activities__wrapper {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1em;
    margin: 0 1em;
    justify-self: center;
  }

  .activities__title {
    font-variant: small-caps;
    color: var(--gold);
    letter-spacing: .1em;
  }

  .activities__title_val {
    color: var(--purple-dark);
  }

  .activities__header {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    margin: 0 1em;
    justify-self: stretch
  }

  .activities__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: .2em;
    justify-content: center;
    justify-items: left;
    align-items: center;
    margin-top: .1em;
    border-radius: 1em;
    transition: ease .5s all;
    padding-left: .2em;
  }

  .activities__list:hover {
    background: var(--purple);
    color: whitesmoke;
  }

  .payments {
    grid-template-columns: auto 1fr auto auto 1fr;
    cursor: pointer;
  }

  .payments__head {
    grid-template-columns: auto repeat(2, 1fr) auto 1fr !important;
  }

  .attendances {
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    cursor: pointer;
  }

  .attendances__head {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  div.activities__list:nth-child(even) {
    background: var(--purple-lighter);
  }

  div.activities__list:nth-child(even):hover {
    background: var(--purple);
    color: whitesmoke;
  }

  .activities__item {
    padding: .1em;
    margin: .1em
  }

  .for_mobile {
    min-width: 120px;
  }

  .filter_bar {
    justify-self: center;
    border-radius: .5em;
    padding: 0 .2em;
    margin: .5em 0;
  }

  .cient__name {
    justify-self: center;
    color: var(--gold);
    font-size: 2em;
  }

  .tool__act {
    margin-right: .2em;
    margin-left: .1em;
    font-variant: none;
    font-size: .7em;
  }
</style>