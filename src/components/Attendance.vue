<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addAttendance()" method="post" class="user__form">

        <h3 v-if="!getOneAttendance._id" class="new_item">NOVA PRISUSTVA</h3>

        <div class="input__group ">
          <div class="input__field att_date">

            <label for="datePicker">Datum 
              <div class="tooltip" v-if="!getOneAttendance._id">
                <svg version="1.1" id="Capa_1" x="0px" y="0px" width="15px"
                    viewBox="0 0 23.625 23.625" style="enable-background:new 0 0 23.625 23.625;" xml:space="preserve">
                  <g>
                    <path style="fill:var(--purple);" d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813
                      S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189
                      c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759
                      l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717
                      c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828
                      c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53
                      c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68
                      c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728
                      c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z
                      M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193
                      c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497
                      c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"/>
                  </g>
                </svg>
                <span class="tooltiptext">
                  Kad izabereš datum izlistaju se svi aktivni klijenti čije se grupe održavaju tog dana.
                </span>
              </div>
            </label>
            <datepicker v-model="attendanceInput.attend_date" 
                        placeholder="datum upisa" 
                        class="login_input user_input"
                        :language="sr"
                        @input="selectDate()">
            </datepicker>
            <h3 class="weekday">{{ attendanceInput.attend_date | formatDate }}</h3>
          </div>

          <div class="att_totals">
            <h4>Ukupno: {{ filteredClients.length }}</h4>
            <h4>Prisustvovalo: {{ presentClients() }}</h4>
          </div>
          
        </div>
        
        <div class="members__list">
          <div class="members__items">

          <search-bar :searchStr="search" 
                      :pageSizeNr="pageSize"
                      @changed="setPageSize"
                      @typed="searchClients" />
   <!--        <div class="clients__ss search_group">
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
                      v-model="search" class="login_input search_input" placeholder="traži (ime, prezime, tel.)">
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
          </div> -->

            <div class="">
              <div class="days__list attendance__list_header">
                <span>Vježbačica</span>
                <span>Prisutna</span>
                <span>Napomena</span>
              </div>

              <div v-for="member in pageOfItems" :key="member._id" name="member"
                  class="members_input att_members">
                <div class="att_member">
                  {{ attendanceInput.members.map(item => item.client._id).indexOf(member.client._id) + 1 }}
                  {{ member.client.last_name }}, {{ member.client.first_name }}
                </div>
                <input type="checkbox" v-model="member.present" class="login_input user_input payment__price check">
                <input type="text" v-model="member.note" class="login_input user_input payment__note">
              </div>

            </div>
          </div>
        </div>

        <jw-pagination :items="filteredClients" @changePage="onChangePage" 
                        :initialPage="initialPage" :pageSize="pageSize" 
                        :labels="customLabels" :styles="customStyles"
                        class="pagine">
        </jw-pagination>

        <div class="modify_btns">
          <action-buttons toForm='attendances' />
          <delete-button @clicked="delClient()" />
        </div>

      </form>
    </div>
  </transition>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import Loading from '@/components/utils/Loading.vue';
  import SearchBar from '@/components/utils/SearchBar.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import DeleteButton from '@/components/utils/DeleteButton.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import navigation from '../mixins/navigation';
  import navigationSearch from '../mixins/navigationSearch';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Attendance',

    components: {
      Loading, 
      Datepicker, 
      SearchBar,
      ActionButtons,
      DeleteButton
    },

    mixins: [
      actionsNotify, 
      navigation, 
      navigationSearch
    ],

    data() {
      return {
        sr: sr,
        customLabels,
        customStyles,
        attendanceInput: {
          attend_date: new Date,
          notes: '',
          members: []
        },
        notClients: [],
      }
    },

    watch: {
      pageSize() { 
        this.searchClients();
      }
    },

    computed: {
      ...mapGetters([ 'getAllAttendances', 
                      'getOneAttendance',
                      'getAllClients',
                      'getAllSchedules',
                      'getClientsPageSize',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'attendanceAdd', 
                      'attendanceUpdate', 
                      'attendanceDelete',
                      'fetchClients',
                      'fetchSchedules',
                      'fetchClientsPageSize',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      setPageSize(val) {
        this.pageSize = val;
        this.fetchClientsPageSize(val);
      },
        
      async searchClients(val = '') {
        await this.initClients();
        let mu = this.attendanceInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.mobile.includes(val)
        });
        this.filteredClients = mu;
      },

      presentClients() {
        return this.filteredClients.filter(a => {
          return a.present === true
        }).length
      },

      async selectDate() {
        if (!this.getOneAttendance._id) {
          await this.fetchSchedules();
          const selDate = this.attendanceInput.attend_date.getDay();
          const cgDays = ['Neđelja', 'Poneđeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
          const cgDay = cgDays[selDate];
          const filteredSchedules = this.getAllSchedules.filter((a) => {
            return a.weekday.includes(cgDay)
          }).map(item => {
              let container = {};
              container = item.members;
              return container;
          })
          const merged = [].concat.apply([], filteredSchedules);
          this.attendanceInput.members = [];
          this.filteredClients = [];
          this.addAllmembers(merged);
        }
      },

      async addAttendance() {
        this.setLoadingState(true);
        if (this.getOneAttendance._id) {
          await this.attendanceUpdate(this.attendanceInput);
        } else {
          await this.attendanceAdd(this.attendanceInput);
        }
        this.setLoadingState(false);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success);
          this.formTypeChange('attendances');
        }
      },

      addAllmembers(cli) {
        for (let i = 0; i < cli.filter(active => active.client.active !== false).length; i++) {
          this.attendanceInput.members.push({
            'client':this.getAllClients.filter(active => active.active !== false)[i], 
            'present':true, 
            'note': ''
          })
        }
        this.filteredClients = this.attendanceInput.members
        this.notClients = [];
      },

      mapMembers() {
        return this.attendanceInput.members.map(item => {
            let container = {};
            container = item.client;
            return container;
        });
      },

      async delEx() {
        await this.attendanceDelete(this.getOneAttendance);
        this.formTypeChange('attendances');
      },

      async initClients() {
        if (this.getOneAttendance._id) {
          this.attendanceInput = this.getOneAttendance;
          this.notClients = this.getAllClients.filter((elem) => !this.mapMembers().find(({ _id }) => elem._id === _id));
          this.filteredClients = this.attendanceInput.members;
        } else {
          this.notClients = this.getAllClients.filter(active => active.active === true);
          await this.selectDate();
        }
        if (this.getClientsPageSize !== 10) this.pageSize = this.getClientsPageSize;
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format("dddd")
        }
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format("YYYY");
      this.year = currentYear;
      await this.fetchClients();
      await this.initClients();
      this.setLoadingState(false);
    },
  }
</script>

<style>
  ::-webkit-input-placeholder { font-size: .8em; }
  ::-moz-placeholder { font-size: .8em; } /* firefox 19+ */
  :-ms-input-placeholder { font-size: .8em; } /* ie */
  input:-moz-placeholder { font-size: .8em; }

  @media only screen and (max-width: 599px) {
    .days__list {
      /* font-size: 80%; */
      grid-template-columns: repeat(2 ,auto) !important; 
    }
    .members_input  {
      grid-template-columns: repeat(2 ,auto) !important;
    }
    .expenses__header {
      grid-template-columns: repeat(3 ,auto) !important;
    }
    .expense__list {
      grid-template-columns: repeat(3 ,auto) !important;
    }
    .clients__list {
      grid-template-columns: repeat(2 ,auto) ;
    }
    .activities__list {
      grid-template-columns: repeat(2 ,1fr) !important;
    }
    .activities__wrapper {
      grid-template-columns: auto !important;
    }
    .attend__heading {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .attend__list {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .payment__heading {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .cient__name {
      font-size: 2em;
    }
  }

  .schedule__wrapper {
    display: flex;
    justify-content: center;
  }

  .bloc {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    height: 140px;
  }

  .bloc select {
    padding: 10px;
    margin: -5px -20px -5px -5px;
  }

  .day__select {
    border: none;
    height: 140px;
    font-family: 'Itim', cursive;
  }

  .attendance__list_header {
    grid-template-columns: repeat(3, auto);
  }

  .members__list {
    display: flex;
    text-align: left;
    align-items: baseline;
    font-size: 1em;
    justify-self: center;
    margin: 0 .5em;
  }

  .members_input {
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr repeat(3, auto);
    align-items: center;
    grid-column-gap: 1em;
  }

  .members__items .members_input:nth-child(odd) {
    background-color: var(--purple-lighter);
    border-radius: .5em;
  }

  .memeber__date {
    margin: 0;
  }

  .all__clients_btn {
    cursor: pointer;
    border: 2px solid var(--purple);
    border-radius: .5em;
    padding: .1em;
  }

  .input__payment {
    grid-template-columns: 1fr 1fr ;
  }

  .payment__list {
    justify-items: left;
  }

  .pagine {
    margin: .5em auto !important;
  }

  .search_group {
    background: var(--gold-lighter);
    border-radius: .5em;
    padding: 0 .5em;
    margin-top: .5em;
  }

  .search_group label {
    color: var(--black);
  }

  .search_group select {
    margin: 0 .2em;
  }

  select {
    cursor: pointer;
  }

  .nr_clients {
    margin: 0 .2em;
    padding: 0;
  }

  .att_members {
    cursor: default;
  }

  .att_member {
    margin-left: .3em;
    font-size: 1.2em;
  }

  .check {
    cursor: pointer;
  }

  .att_totals {
    text-align: right;
    border-radius: .5em;
    /* border: 1px solid var(--gold); */
    padding: .2em;
    justify-self: end;
    align-self: baseline;
    margin-top: .5em;
    color: var(--gold-light);
    background-color: var(--purple);
    /* grid-area: 3 / 1 / 4 / 3; */
  }

  .att_date {
    /* display: flex; */
    align-items: baseline;
  }

  .weekday {
    justify-self: left;
    margin-left: .5em;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: var(--purple-dark);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

</style>