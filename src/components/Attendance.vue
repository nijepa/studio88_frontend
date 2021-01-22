<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addAttendance()" method="post" class="user__form">

        <div class="input__group ">
          <div class="input__field att_date">
            <label for="datePicker">Datum</label>
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
          </div>

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

        <action-buttons toForm='attendances' />

        <button type="submit" @click.prevent="delClient()"
                class="action_btn delete__btn">
          <svg version="1.1" id="Layer_1" x="0px" y="0px" height="25px" 
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <rect x="114.402" y="220.724" style="fill:#CEE8FA;" width="274.813" height="276.96"/>
            <g>
              <path style="fill:var(--red-dark);" d="M182.746,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C197.06,415.895,190.652,422.305,182.746,422.305z"/>
              <path style="fill:var(--red-dark);" d="M251.808,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C266.121,415.895,259.713,422.305,251.808,422.305z"/>
              <path style="fill:var(--red-dark);" d="M320.869,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C335.182,415.895,328.774,422.305,320.869,422.305z"/>
              <path style="fill:var(--red-dark);" d="M434.571,135.961c-8.435-13.251-21.524-22.423-36.856-25.828
                c-7.712-1.722-15.362,3.152-17.076,10.869c-1.713,7.718,3.153,15.361,10.869,17.076c7.869,1.749,14.585,6.455,18.913,13.255
                c4.328,6.8,5.75,14.879,4.002,22.748l-7.423,33.418L99.603,139.224l7.423-33.42c3.608-16.243,19.754-26.519,36.002-22.917
                l145.2,32.249c7.713,1.713,15.361-3.153,17.076-10.869c1.713-7.718-3.153-15.361-10.869-17.076l-82.44-18.309l8.327-37.493
                l122.96,27.308l-11.431,51.467c-1.713,7.718,3.153,15.361,10.869,17.076c1.045,0.232,2.088,0.344,3.116,0.344
                c6.563,0,12.478-4.542,13.96-11.213l14.534-65.44c0.823-3.706,0.14-7.587-1.898-10.789c-2.038-3.202-5.266-5.463-8.972-6.286
                L212.555,0.342c-7.713-1.709-15.362,3.152-17.076,10.869l-11.43,51.466l-34.815-7.732C117.579,47.909,86.11,67.948,79.079,99.6
                l-10.526,47.391c-1.713,7.718,3.153,15.361,10.869,17.076l190.666,42.347H114.402c-7.905,0-14.313,6.409-14.313,14.313v276.96
                c0,7.904,6.408,14.313,14.313,14.313h274.81c7.905,0,14.313-6.409,14.313-14.313V236.049l11.243,2.498
                c1.026,0.229,2.067,0.341,3.103,0.341c2.701,0,5.37-0.764,7.686-2.239c3.202-2.038,5.463-5.266,6.288-8.972l10.526-47.391
                C445.776,164.954,443.006,149.212,434.571,135.961z M374.9,483.374H128.716V235.04H374.9V483.374z"/>
            </g>
          </svg>
          <p>Obriši</p>
        </button>

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
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Attendance',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons
    },

    mixins: [actionsNotify],

    data() {
      return {
        sr: sr,
        search: '',
        filteredClients: [],
        pageOfItems: [],
        initialPage: 1,
        pageSize: 10,
        customLabels,
        customStyles,
        attendanceInput: {
          attend_date: new Date,
          notes: '',
          members: []
        },
        notClients: [],
        appeared: false,
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

      onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
      },

      setPageSize() {
        this.fetchClientsPageSize(this.pageSize);
      },
        
      async searchClients() {
        await this.initClients();
        let mu = this.attendanceInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.client.mobile.includes(this.search)
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
          return moment(String(value)).format('dddd')
        }
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format('YYYY');
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
    border: 2px solid var(--gold);
    padding: .2em;
    justify-self: end;
    align-self: baseline;
  }

  .att_date {
    display: flex;
    align-items: baseline;
  }

  .weekday {
    justify-self: left;
    margin-left: .5em;
  }

</style>