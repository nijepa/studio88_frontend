<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading1" v-if="loadingState" key="1" />
    
    <div v-else class="client__wrapper" key="2">

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

      <transition name="rise" mode="out-in" key="1">
        <div v-if="!toggleActions" class="activities__btns">
          <button 
            class="action_btn client__add for_mobile"
            @click="toggleActions = 'p'"
          >
            Plaćanje
          </button>
          <Tooltip tip="Klikni na plaćanje / prisustvo za dodavanje istog ili selektuj klijenta iz liste za izmjenu / brisanje" />
          <button 
            class="action_btn client__add for_mobile" 
            @click="toggleActions = 'a'"
          >
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
        <Tooltip tip="Izaberi datume za prikazivanje svih prisustava / plaćanja u tom periodu" />

        <div class="dash__text filter_bar">
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
    border: 2px solid var(--purple-dark);
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
    padding: 0 .5em;
    margin: .5em 0;
  }

  .cient__name {
    justify-self: center;
    color: var(--gold);
    font-size: 2em;
  }
</style>